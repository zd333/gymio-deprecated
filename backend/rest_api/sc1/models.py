from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone

#from django.utils.translation import ugettext as _  # TODO: find out how to perform internationalization
from gettext import gettext as _


RIGHT_CHOICES = (
        ('CO', _('Club owner')),
        ('FK', _('Finance keeper')),
        ('EI', _('Expenses compositor')),
        ('HR', _('Human resources')),
        ('SK', _('Sales keeper')),
        ('RA', _('Reception admin')),
        ('HT', _('Head trainer')),
    )


class Club(models.Model):
    club_name = models.CharField(max_length=20)
    club_address = models.CharField(max_length=45)
    club_gps_str = models.CharField(max_length=100, null=True, blank=True)
    club_phones = models.CharField(max_length=45)
    club_email = models.EmailField(max_length=45)
    club_homepage = models.URLField(null=True, blank=True)
    club_key = models.CharField(max_length=200, null=True, blank=True)
    # TODO: remove short name
    club_short_name = models.CharField(max_length=8)
    club_list_languages = models.CharField(max_length=20, blank=True)

    # frontend settings
    club_show_finance_module = models.BooleanField(default=True)
    club_show_hr_module = models.BooleanField(default=True)
    club_show_reports_module = models.BooleanField(default=True)
    club_show_gym_room_module = models.BooleanField(default=True)
    club_show_measurements_module = models.BooleanField(default=True)
    club_show_meal_module = models.BooleanField(default=True)
    club_show_menses_module = models.BooleanField(default=True)
    club_show_ads = models.BooleanField(default=False)

    # internal backend settings
    club_allow_push_notifications = models.BooleanField(default=False)
    club_allow_email_notification = models.BooleanField(default=False)
    club_allow_sms_notification = models.BooleanField(default=False)
    club_internal_notes = models.CharField(max_length=800, blank=True)

    def __str__(self):
        return self.club_name


class WorkoutType(models.Model):
    workout_club = models.ForeignKey(Club)
    workout_name = models.CharField(max_length=45)
    workout_max_visitors = models.SmallIntegerField()
    workout_duration = models.SmallIntegerField()
    workout_description = models.CharField(max_length=200)
    workout_min_fee = models.DecimalField(max_digits=6, decimal_places=2)
    workout_max_fee = models.DecimalField(max_digits=6, decimal_places=2)
    workout_per_visitor_fee = models.DecimalField(max_digits=6, decimal_places=2)
    workout_is_active = models.BooleanField()


class PositionType(models.Model):
    position_club = models.ForeignKey(Club)
    position_name = models.CharField(max_length=45)
    workout_types = models.ManyToManyField(WorkoutType)


class PositionRight(models.Model):
    position_right_position = models.ForeignKey(PositionType, related_name='positionRights')
    position_right_text = models.CharField(max_length=2, choices=RIGHT_CHOICES)

    def __str__(self):
        return str(self.position_right_text)


class ClubUserManager(BaseUserManager):
    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError(_('Users must have a valid login name.'))

        if not kwargs.get('user_birthday'):
            raise ValueError(_('Users must have a valid birthday date.'))

        if not kwargs.get('user_full_name'):
            raise ValueError(_('Users must have a valid full name.'))

        club_user = self.model(
            username=username, user_birthday=kwargs.get('user_birthday'), user_full_name=kwargs.get('user_full_name')
        )

        club_user.set_password(password)
        club_user.save()

        return club_user

    def create_superuser(self, username, password, **kwargs):
        club_user = self.create_user(username, password, **kwargs)

        club_user.is_superuser = True
        club_user.is_staff = True
        club_user.is_active = True
        club_user.save()

        return club_user


# function to create path to store user photo
def upload_photo(instance, filename):
    return 'sc1/photos/club_{}/user_{}/{}'.format(instance.user_club_id, instance.id, filename)


class ClubUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=45, unique=True)
    email = models.EmailField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateField(auto_now_add=True)  # check what format is returned

    # в это поле сохранять номер\идентификатор абонемента\карточки, которые использовались в клубе до
    # внедрения Gymio (ну и в случае, если клуб хочет продолжать использовать эту модель идентификации пользователей)
    # после внедрения Gymio
    card_id = models.CharField(null=True, blank=True, max_length=45)

    user_club = models.ForeignKey(Club, null=True, blank=True)  # Allow null for Gymio owners
    user_full_name = models.CharField(max_length=100)
    user_phone = models.CharField(max_length=100)
    user_gender = models.BooleanField(default=False)  # False=female, True=male :)
    user_birthday = models.DateField()
    user_description = models.CharField(max_length=800, blank=True)  # external info, available for all users
    user_notes = models.CharField(max_length=800, blank=True)  # internal, for club staff
    user_position = models.ForeignKey(PositionType, null=True, blank=True)
    user_photo = models.ImageField(null=True, blank=True) # Эта фотка не будет загружаться напрямую, только через отдельный action REST-сервиса из user_photo_not_approved
    user_photo_not_approved = models.ImageField(null=True, blank=True, upload_to=upload_photo)

    objects = ClubUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_birthday', 'user_full_name']

    def get_full_name(self):
        return self.user_full_name

    def get_short_name(self):
        return self.username


class UserRight(models.Model):
    user_right_user = models.ForeignKey(ClubUser, related_name='userRights')
    user_right_text = models.CharField(max_length=2, choices=RIGHT_CHOICES)

    def __str__(self):
        return str(self.user_right_text)


class StaffComing(models.Model):
    staff_coming_user = models.ForeignKey(ClubUser, related_name='employee_who_came_to_work')
    staff_coming_date = models.DateField(default=timezone.now)
    staff_coming_worked_hours = models.SmallIntegerField()
    staff_coming_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_coming_to_work')
    staff_coming_update_time = models.DateTimeField(default=timezone.now)


class StaffPayment(models.Model):
    staff_payment_receiver_id = models.ForeignKey(ClubUser, related_name='employee_who_received_payment')
    staff_payment_date = models.DateField(default=timezone.now)
    staff_payment_amount = models.DecimalField(max_digits=6, decimal_places=2)
    staff_payment_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_payment')
    staff_payment_input_time = models.DateTimeField(default=timezone.now)


class Expense(models.Model):
    expense_club = models.ForeignKey(Club)  # duplicate?
    expense_description = models.CharField(max_length=200)
    expense_receipt_photo = models.ImageField()
    expense_time = models.DateTimeField(default=timezone.now)
    expense_amount = models.DecimalField(max_digits=6, decimal_places=2)
    expense_input_by = models.ForeignKey(ClubUser)
    expense_input_time = models.DateTimeField(default=timezone.now)


class TicketType(models.Model):
    ticket_club = models.ForeignKey(Club)
    ticket_name = models.CharField(max_length=45)
    ticket_cost = models.DecimalField(max_digits=6, decimal_places=2)
    ticket_visit_amount = models.SmallIntegerField()
    ticket_expiration = models.SmallIntegerField()
    ticket_max_freezes = models.SmallIntegerField()
    ticket_time = models.CharField(max_length=100)
    ticket_weekdays = models.CharField(max_length=100)
    ticket_is_active = models.BooleanField()
    workout_types = models.ManyToManyField(WorkoutType)


class TicketSale(models.Model):
    ticket_sale_type = models.ForeignKey(TicketType)
    ticket_sale_buyer = models.ForeignKey(ClubUser, related_name='user_who_bought_ticket')
    ticket_sale_price = models.DecimalField(max_digits=6, decimal_places=2)
    ticket_sale_time = models.DateTimeField(default=timezone.now)
    ticket_sale_seller = models.ForeignKey(ClubUser, related_name='employee_who_sold_ticket')


class TicketFreez(models.Model):
    ticket_freez_sold_ticket = models.ForeignKey(TicketSale)
    ticket_freez_start_date = models.DateField(default=timezone.now)
    ticket_freez_days = models.SmallIntegerField()
    ticket_freez_input_by = models.ForeignKey(ClubUser)


class WorkoutSchedule(models.Model):
    scheduled_workout_club = models.ForeignKey(Club)
    scheduled_workout_time = models.DateTimeField
    scheduled_workout_type = models.ForeignKey(WorkoutType)
    scheduled_workout_trainer = models.ForeignKey(ClubUser, related_name='employee_trainer_of_workout')
    scheduled_workout_input_by = models.ForeignKey(ClubUser, related_name='employee_who_scheduled_workout')
    scheduled_workout_cancel_time = models.DateTimeField(null=True, default=None)
    scheduled_workout_canceled_by = models.ForeignKey(ClubUser, null=True, related_name='employee_'
                                                                                        'who_canceled_scheduling')


class WorkoutSigning(models.Model):
    signing_scheduled_workout = models.ForeignKey(WorkoutSchedule)
    signing_visitor = models.ForeignKey(ClubUser, related_name='user_who_signed_to_come')
    signing_input_time = models.DateTimeField(default=timezone.now)
    signing_input_by = models.ForeignKey(ClubUser, related_name='user_who_input_signing')
    signing_cancelled_by = models.ForeignKey(ClubUser, null=True, related_name='employee_who_cancelled_signing')


class WorkoutVisit(models.Model):
    visit_scheduled_workout = models.ForeignKey(WorkoutSchedule)
    visit_visitor = models.ForeignKey(ClubUser, related_name='user_who_came_to_workout')
    visit_input_time = models.DateTimeField(default=timezone.now)
    visit_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_coming_to_workout')
