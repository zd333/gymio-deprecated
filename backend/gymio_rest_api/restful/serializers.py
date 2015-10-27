from rest_framework import serializers
from .models import ClubUser


class ClubUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ClubUser
        fields = (
            'email',
            'username',
            'is_active',
            'date_joined',
            'user_club',
            'user_full_name',
            'user_phones',
            'user_gender',
            'user_birthday',
            'user_description',
            'user_notes',
            'user_position',
            'user_photo',
            'user_photo_not_validated',
        )

