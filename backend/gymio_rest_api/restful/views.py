from rest_framework import viewsets
from .models import ClubUser
from .serializers import ClubUserSerializer


class ClubUserViewSet(viewsets.ModelViewSet):
    queryset = ClubUser.objects.all()
    serializer_class = ClubUserSerializer
