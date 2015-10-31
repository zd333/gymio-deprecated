from rest_framework import serializers
from django.contrib.auth import update_session_auth_hash
from .models import Club, ClubUser


class ClubSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Club
        fields = (
            'club_name',
            'club_address',
            'club_gps_str',
            'club_phones',
            'club_email',
            'club_homepage',
        )
        read_only_fields = (
            'club_name',
            'club_address',
            'club_gps_str',
            'club_phones',
            'club_email',
            'club_homepage',
        )


class ClubUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = ClubUser
        fields = (
            'username',
            'email',
            'date_joined',
            'user_full_name',
            'user_phones',
            'user_gender',
            'user_birthday',
            'user_description',
            'user_photo',
            'user_photo_not_approved',
            'password',
        )
        read_only_fields = ('date_joined',)
