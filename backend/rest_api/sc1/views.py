import json
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, mixins, permissions, status, views
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
#from rest_framework.decorators import detail_route, parser_classes
from .models import Club, ClubUser
from .serializers import ClubSerializer, ClubUserSerializer
from . import permissions as my_permissions
from gettext import gettext as _


# TODO: wipe this after debug is finished
import logging
logger = logging.getLogger(__name__)


class ClubViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = (permissions.AllowAny,)


class ClubUserViewSet(mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = ClubUser.objects.all()
    pagination_class = None  # this will work till amount of users is not huge
    serializer_class = ClubUserSerializer
    permission_classes = (my_permissions.UnAuthenticatedOrActiveAuthorizedStaffCanPostUser,
                          my_permissions.OwnerOrActiveStaffCanViewUser,
                          my_permissions.AnyCanViewStaffUser,
                          my_permissions.OwnerOrActiveAuthorizedStaffCanEditUser)
    # with this parser classes we can upload both json and form data (with files)
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def perform_create(self, serializer):
        # get club by id from URL named parameter
        # check if club exists
        # set foreign key value to model field
        club_id = self.kwargs['club']
        try:
            club = Club.objects.get(pk=club_id)
        except Club.DoesNotExist:
            raise NotFound(_('Club not found'))

        password = serializer.validated_data.get('password', None)
        if password is None:
            raise ValidationError(_({'password': ['This field is required.']}))
        if len(password) < 3:
            raise ValidationError(_({'password': ['This field must be at least 3 symbols long.']}))

        serializer.save(user_club=club)

    # don't use mixin to perform checking club id and save new photo
    def update(self, request, pk=None, club=None):
        user = get_object_or_404(self.queryset, pk=pk, user_club=club)
        photo = request.FILES.get('user_photo_not_approved')
        if photo is not None:
            # TODO: add checking of file size
            # delete old photo from disk, no need to save model - it will be saved by in next statements
            user.user_photo_not_approved.delete(save=False)
            user.user_photo_not_approved.save(photo.name, photo)

        serializer = self.get_serializer(user, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    # don't use mixin to perform checking club id
    def retrieve(self, request, pk=None, club=None):
        user = get_object_or_404(self.queryset, pk=pk, user_club=club)
        self.check_object_permissions(request, user)
        serializer = self.serializer_class(user, context={'request': request})
        return Response(serializer.data)

    # don't use mixin to narrow user list by club id
    def list(self, request, club=None):
        # permission logic is implemented here to get different narrow for different user groups:
        # CO get list all club users
        # RA get list of customer users (not staff)
        # all other (incl. unauthenticated) get list of staff
        # TODO: implement logic above and beyond
        # if request.user.is_authenticated():
            # request.user - is instance of logged in user
            # check if it has RA, CO roles (direct or by position referrence)
            # club_queryset = self.queryset.filter(user_club=club, is_staff = true/false)

        club_queryset = self.queryset.filter(user_club=club)
        serializer = self.serializer_class(club_queryset, many=True)
        return Response(serializer.data)


# Use essential APIView because this view is not CRUD, just need to perform some actions
# and can use serializer of user model
class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, club=None):
        data = json.loads(request.body.decode('utf-8'))  # TODO: added decode because of type error on python 3, check this?

        username = data.get('username', None)
        password = data.get('password', None)

        # check if user club is correct, if not - don't allow to enter
        if not ClubUser.objects.filter(username=username, user_club=club).exists():
            raise PermissionDenied

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)

            serialized = ClubUserSerializer(user)

            return Response(serialized.data)
        else:
            return Response({
                'status': _('Unauthorized'),
                'message': _('Username/password combination invalid.')
            }, status=status.HTTP_401_UNAUTHORIZED)


# Use generic APIView because this view is not CRUD, just need to perform some actions
class LogoutView(views.APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    # TODO: add checking if this is logged in user who wants to logout

    def post(self, request, club=None):
        # don't check club, because it is safe operation
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


# Use essential APIView because this view is not CRUD, just need to perform some actions
# and can use serializer of user model
class ApproveUserPhotoView(views.APIView):
    permission_classes = (my_permissions.AuthorizedStaffCanApproveUserPhoto,)

    def post(self, request, pk=None, club=None):
        user = ClubUser.objects.get(pk=pk, user_club=club)
        user.user_photo.delete(save=False)
        user.user_photo.name = user.user_photo_not_approved.name
        user.user_photo_not_approved.name = None

        user.save()

        serialized = ClubUserSerializer(user)
        return Response(serialized.data)


# Use essential APIView because this view is not CRUD, just need to perform some actions
# and can use serializer of user model
class RejectUserPhotoView(views.APIView):
    permission_classes = (my_permissions.AuthorizedStaffCanApproveUserPhoto,)

    def post(self, request, pk=None, club=None):
        user = ClubUser.objects.get(pk=pk, user_club=club)
        user.user_photo_not_approved.delete(save=False)

        user.save()

        serialized = ClubUserSerializer(user)
        return Response(serialized.data)
