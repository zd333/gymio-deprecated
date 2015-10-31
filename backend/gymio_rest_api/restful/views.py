from rest_framework import viewsets, mixins
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Club, ClubUser
from .serializers import ClubSerializer, ClubUserSerializer
from gettext import gettext as _


class ClubViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


class ClubUserViewSet(mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = ClubUser.objects.all()
    serializer_class = ClubUserSerializer

    def perform_create(self, serializer):
        # get club by id from URL named parameter
        # check if club exists
        # set foreign key value to model field
        club_id = self.kwargs['club']
        try:
            club = Club.objects.get(pk=club_id)
        except Club.DoesNotExist:
            raise NotFound(_('Club not found'))

        serializer.save(user_club=club)

    # don't use mixin to perform filtering by club
    def retrieve(self, request, pk=None, club=None):
        user = get_object_or_404(self.queryset, pk=pk, user_club=club)
        serializer = ClubUserSerializer(user)
        return Response(serializer.data)
