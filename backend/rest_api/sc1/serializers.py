from rest_framework import serializers
from django.contrib.auth import update_session_auth_hash
from .models import Club, ClubUser

# TODO: all serializers are set to ModelSerializer
# better solution would be to use HyperlinkedModelSerializer
# because it returns direct URLs instead of IDs
# but because of customized URL structure with club parameter almost for every model/action
# HyperlinkedModelSerializer does not work (it uses one lookup field to specify reverse URL)
# see this possible workaround: http://stackoverflow.com/a/26670818



class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = (
            'club_name',
            'club_address',
            'club_gps_str',
            'club_phones',
            'club_email',
            'club_homepage',
            'club_short_name',
            'club_list_languages',
            'club_show_finance_module',
            'club_show_hr_module',
            'club_show_reports_module',
            'club_show_gym_room_module',
            'club_show_measurements_module',
            'club_show_meal_module',
            'club_show_menses_module',
            'club_show_ads',
        )
        read_only_fields = (
            'club_name',
            'club_address',
            'club_gps_str',
            'club_phones',
            'club_email',
            'club_homepage',
            'club_short_name',
            'club_list_languages',
            'club_show_finance_module',
            'club_show_hr_module',
            'club_show_reports_module',
            'club_show_gym_room_module',
            'club_show_measurements_module',
            'club_show_meal_module',
            'club_show_menses_module',
            'club_show_ads',
        )


class ClubUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = ClubUser
        fields = (
            'id',
            'username',
            'email',
            'is_staff',  # TODO: create checking of field level permission, only authorized can change this
            'is_active',  # TODO: create checking of field level permission, only authorized can change this
            'date_joined',
            'user_full_name',  # TODO: create checking of field level permission, only authorized can change this
            'user_phone',
            'user_gender',  # TODO: create checking of field level permission, only authorized can change this
            'user_birthday',  # TODO: create checking of field level permission, only authorized can change this
            'user_description',
            'user_notes',
            'user_position',  # TODO: create checking of field level permission, only authorized can change this
            'user_photo',
            'user_photo_not_approved',
            'password',
        )
        read_only_fields = ('id', 'date_joined', 'user_photo', 'user_photo_not_approved',)

    def create(self, validated_data):
        user = ClubUser.objects.create(**validated_data)
        password = validated_data.get('password', None)
        # password check (at least not empty) is in view
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        #  TODO: this is crutch. Can't define username as read only, because need to write it
        #  when creating. Backend will accept updated user name,
        #  but will not update it. Probably, this not so bad :).
        #  Investigate and fix it when everything else will be just perfect.
        #  instance.email = validated_data.get('email', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.user_full_name = validated_data.get('user_full_name', instance.user_full_name)
        instance.user_phone = validated_data.get('user_phone', instance.user_phone)
        instance.user_gender = validated_data.get('user_gender', instance.user_gender)
        instance.user_birthday = validated_data.get('user_birthday', instance.user_birthday)
        instance.user_description = validated_data.get('user_description', instance.user_description)
        instance.user_notes = validated_data.get('user_notes', instance.user_notes)
        instance.user_position = validated_data.get('user_position', instance.user_position)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        update_session_auth_hash(self.context.get('request'), instance)
        return instance
