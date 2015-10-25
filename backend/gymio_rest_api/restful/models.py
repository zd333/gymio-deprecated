from django.db import models
from django.contrib.auth.models import User


class Club(models.Model):
    club_name = models.CharField(max_length=20)
    club_address = models.CharField(max_length=45)
    club_gps_str = models.CharField(max_length=100, blank=True)
    club_phones = models.CharField(max_length=45, blank=True)
    club_email = models.EmailField(max_length=45)
    club_homepage = models.URLField()
    club_key = models.CharField(max_length=200, blank=True)


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
    position_right_club = models.ForeignKey(Club)
    position_right_position = models.ForeignKey(PositionType)
    position_right_text = models.CharField(max_length=45)


class ClubUser(models.Model):
    user = models.OneToOneField(User)
    user_club = models.ForeignKey(Club)  # duplicate?
    user_phones = models.CharField(max_length=100)
    user_gender = models.BooleanField()
    user_birthday = models.DateField()
    user_description = models.CharField(max_length=200, blank=True)
    user_notes = models.CharField(max_length=200, blank=True)
    user_position = models.ForeignKey(PositionType, null=True, blank=True)
    user_photo = models.ImageField()


class UserRight(models.Model):
    user_right_club = models.ForeignKey(Club)  # duplicate?
    user_right_user = models.ForeignKey(ClubUser)
    user_right_text = models.CharField(max_length=45)


class StaffComing(models.Model):
    staff_coming_club = models.ForeignKey(Club)  # duplicate?
    staff_coming_user = models.ForeignKey(ClubUser, related_name='employee_who_came_to_work')
    staff_coming_date = models.DateField()
    staff_coming_worked_hours = models.SmallIntegerField()
    staff_coming_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_coming_to_work')
    staff_coming_update_time = models.DateTimeField


class StaffPayment(models.Model):
    staff_payment_club = models.ForeignKey(Club)  # duplicate?
    staff_payment_receiver_id = models.ForeignKey(ClubUser, related_name='employee_who_received_payment')
    staff_payment_date = models.DateField
    staff_payment_amount = models.DecimalField(max_digits=6, decimal_places=2)
    staff_payment_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_payment')
    staff_payment_input_time = models.DateTimeField


class Expense(models.Model):
    expense_club = models.ForeignKey(Club)  # duplicate?
    expense_description = models.CharField(max_length=200)
    expense_receipt_photo = models.ImageField()
    expense_time = models.DateTimeField
    expense_amount = models.DecimalField(max_digits=6, decimal_places=2)
    expense_input_by = models.ForeignKey(ClubUser)
    expense_input_time = models.DateTimeField


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
    ticket_sale_club = models.ForeignKey(Club)  # duplicate?
    ticket_sale_type = models.ForeignKey(TicketType)
    ticket_sale_buyer = models.ForeignKey(ClubUser, related_name='user_who_bought_ticket')
    ticket_sale_price = models.DecimalField(max_digits=6, decimal_places=2)
    ticket_sale_time = models.DateTimeField()
    ticket_sale_seller = models.ForeignKey(ClubUser, related_name='employee_who_sold_ticket')


class TicketFreez(models.Model):
    ticket_freez_club = models.ForeignKey(Club)  # duplicate?
    ticket_freez_sold_ticket = models.ForeignKey(TicketSale)
    ticket_freez_start_date = models.DateField()
    ticket_freez_days = models.SmallIntegerField()
    ticket_freez_input_by = models.ForeignKey(ClubUser)


class WorkoutSchedule(models.Model):
    scheduled_workout = models.ForeignKey(Club)  # duplicate?
    scheduled_workout_time = models.DateTimeField
    scheduled_workout_type = models.ForeignKey(WorkoutType)
    scheduled_workout_trainer = models.ForeignKey(ClubUser, related_name='employee_trainer_of_workout')
    scheduled_workout_input_by = models.ForeignKey(ClubUser, related_name='employee_who_scheduled_workout')
    scheduled_workout_cancel_time = models.DateTimeField(null=True)
    scheduled_workout_canceled_by = models.ForeignKey(ClubUser, null=True, related_name='employee_'
                                                                                        'who_canceled_scheduling')


class WorkoutSigning(models.Model):
    signing_club = models.ForeignKey(Club)  # duplicate?
    signing_scheduled_workout = models.ForeignKey(WorkoutSchedule)
    signing_visitor = models.ForeignKey(ClubUser, related_name='user_who_signed_to_come')
    signing_input_time = models.DateTimeField()
    signing_input_by = models.ForeignKey(ClubUser, related_name='user_who_input_signing')
    signing_cancelled_by = models.ForeignKey(ClubUser, null=True, related_name='employee_who_cancelled_signing')


class WorkoutVisit(models.Model):
    visit_club = models.ForeignKey(Club)  # duplicate?
    visit_scheduled_workout = models.ForeignKey(WorkoutSchedule)
    visit_visitor = models.ForeignKey(ClubUser, related_name='user_who_came_to_workout')
    visit_input_time = models.DateTimeField()
    visit_input_by = models.ForeignKey(ClubUser, related_name='employee_who_input_coming_to_workout')
