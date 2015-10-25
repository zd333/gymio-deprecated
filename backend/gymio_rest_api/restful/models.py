from django.db import models
from django.contrib.auth.models import User


class Club(models.Model):
    club_name = models.CharField(max_length=20)
    club_address = models.CharField(max_length=45)
    club_gps_str = models.CharField(max_length=100)
    club_phones = models.CharField(max_length=45)
    club_email = models.CharField(max_length=45)
    club_homepage = models.CharField(max_length=100)
    club_key = models.CharField(max_length=200)


class PositionType(models.Model):
    position_club = models.ForeignKey(Club)
    position_name = models.CharField(max_length=45)


class TicketType(models.Model):
    ticket_type_club = models.ForeignKey(Club)
    ticket_type_name = models.CharField(max_length=45)
    ticket_type_cost = models.DecimalField(max_digits=6, decimal_places=2)
    ticket_type_visit_amount = models.SmallIntegerField()
    ticket_type_expiration = models.SmallIntegerField()
    ticket_type_max_freezes = models.SmallIntegerField()
    ticket_type_time = models.CharField(max_length=100)
    ticket_type_weekdays = models.CharField(max_length=100)
    ticket_type_is_active = models.BooleanField()

"""
class ClubUser(models.Model):
    user = models.OneToOneField(User)
    user_club = models.ForeignKey(Club)
    user_phones = models.CharField(max_length=100)
    user_gender = models.BooleanField()
    user_birthday = models.DateField()
    user_description = models.CharField(max_length=200)
    user_notes = models.CharField(max_length=200)
#    user_position_id = models.ForeignKey(PositionType)
    user_photo = models.CharField(max_length=200)


class Expense(models.Model):
#    expense_club = models.ForeignKey(Club)
    expense_description = models.CharField(max_length=200)
    expense_receipt_photo = models.CharField(max_length=100)
    expense_date = models.DateTimeField()
    expense_amount = models.DecimalField(max_digits=6, decimal_places=2)
#    expense_input_by_user_id
    expense_input_time  = models.DateTimeField()
"""