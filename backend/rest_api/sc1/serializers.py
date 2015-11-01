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
            'user_notes',
            'user_photo',
            'user_photo_not_approved',
            'password',
        )
        read_only_fields = ('date_joined',)

    def create(self, validated_data):
        user = ClubUser.objects.create(**validated_data)
        password = validated_data.get('password', None)
        # password check (at least not empty) is in view
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.username)
        instance.user_full_name = validated_data.get('user_full_name', instance.username)
        instance.user_phones = validated_data.get('user_phones', instance.username)
        instance.user_gender = validated_data.get('user_gender', instance.username)
        instance.user_birthday = validated_data.get('user_birthday', instance.username)
        instance.user_description = validated_data.get('user_description', instance.username)
        instance.user_notes = validated_data.get('user_notes', instance.username)
        instance.user_photo = validated_data.get('user_photo', instance.username)
        instance.user_photo_not_approved = validated_data.get('user_photo_not_approved', instance.username)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        update_session_auth_hash(self.context.get('request'), instance)
        return instance
