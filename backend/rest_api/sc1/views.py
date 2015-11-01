from rest_framework import viewsets, mixins, permissions
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Club, ClubUser
from .serializers import ClubSerializer, ClubUserSerializer
from . import permissions as my_permissions
from gettext import gettext as _


class ClubViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = (permissions.AllowAny, )


class ClubUserViewSet(mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = ClubUser.objects.all()
    serializer_class = ClubUserSerializer
    permission_classes = (my_permissions.UnAuthenticatedOrAuthorizedStaffCanPostUser,
                          my_permissions.OwnerOrStaffCanViewUser,
                          my_permissions.StaffCanViewUserList,
                          my_permissions.AuthenticatedCanViewStaffUser,
                          my_permissions.OwnerOrAuthorizedStaffCanEditUser)

    def perform_create(self, serializer):
        # get club by id from URL named parameter
        # check if club exists
        # set foreign key value to model field
        club_id = self.kwargs['club']
        try:
            club = Club.objects.get(pk=club_id)
        except Club.DoesNotExist:
            raise NotFound(_('Club not found'))

        # TBD: perform check of password here, now simply check if it's nor empty
        password = serializer.validated_data.get('password', None)
        if not password:
            raise ValidationError(_('Password have not passed complexity check.'))

        serializer.save(user_club=club)

    # don't use mixin to perform filtering by club
    def retrieve(self, request, pk=None, club=None):
        user = get_object_or_404(self.queryset, pk=pk, user_club=club)
        self.check_object_permissions(request, user)
        serializer = self.serializer_class(user)
        return Response(serializer.data)
