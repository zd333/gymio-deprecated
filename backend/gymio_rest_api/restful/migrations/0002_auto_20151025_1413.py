# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restful', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClubUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_phones', models.CharField(max_length=100)),
                ('user_gender', models.BooleanField()),
                ('user_birthday', models.DateField()),
                ('user_description', models.CharField(max_length=200)),
                ('user_notes', models.CharField(max_length=200)),
                ('user_photo', models.CharField(max_length=200)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
                ('user_position_id', models.ForeignKey(to='restful.PositionType')),
            ],
        ),
        migrations.CreateModel(
            name='WorkoutType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('workout_name', models.CharField(max_length=45)),
                ('workout_max_visitors', models.SmallIntegerField()),
                ('workout_duration', models.SmallIntegerField()),
                ('workout_description', models.CharField(max_length=200)),
                ('workout_min_fee', models.DecimalField(max_digits=6, decimal_places=2)),
                ('workout_max_fee', models.DecimalField(max_digits=6, decimal_places=2)),
                ('workout_per_visitor_fee', models.DecimalField(max_digits=6, decimal_places=2)),
                ('workout_is_active', models.BooleanField()),
                ('workout_club', models.ForeignKey(to='restful.Club')),
            ],
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_club',
            new_name='ticket_club',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_cost',
            new_name='ticket_cost',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_expiration',
            new_name='ticket_expiration',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_is_active',
            new_name='ticket_is_active',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_max_freezes',
            new_name='ticket_max_freezes',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_name',
            new_name='ticket_name',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_time',
            new_name='ticket_time',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_visit_amount',
            new_name='ticket_visit_amount',
        ),
        migrations.RenameField(
            model_name='tickettype',
            old_name='ticket_type_weekdays',
            new_name='ticket_weekdays',
        ),
    ]
