# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restful', '0003_auto_20151025_1425'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('expense_description', models.CharField(max_length=200)),
                ('expense_receipt_photo', models.CharField(max_length=100)),
                ('expense_amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('expense_club', models.ForeignKey(to='restful.Club')),
                ('expense_input_by', models.ForeignKey(to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='PositionRight',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('position_right_text', models.CharField(max_length=45)),
                ('position_right_club', models.ForeignKey(to='restful.Club')),
                ('position_right_position', models.ForeignKey(to='restful.PositionType')),
            ],
        ),
        migrations.CreateModel(
            name='StaffComing',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('staff_coming_date', models.DateField()),
                ('staff_coming_worked_hours', models.SmallIntegerField()),
                ('staff_coming_club', models.ForeignKey(to='restful.Club')),
                ('staff_coming_input_by', models.ForeignKey(related_name='employee_who_input_coming_to_work', to='restful.ClubUser')),
                ('staff_coming_user', models.ForeignKey(related_name='employee_who_came_to_work', to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='StaffPayment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('staff_payment_amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('staff_payment_club', models.ForeignKey(to='restful.Club')),
                ('staff_payment_input_by', models.ForeignKey(related_name='employee_who_input_payment', to='restful.ClubUser')),
                ('staff_payment_receiver_id', models.ForeignKey(related_name='employee_who_received_payment', to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='TicketFreez',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('ticket_freez_start_date', models.DateField()),
                ('ticket_freez_days', models.SmallIntegerField()),
                ('ticket_freez_club', models.ForeignKey(to='restful.Club')),
                ('ticket_freez_input_by', models.ForeignKey(to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='TicketSale',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('ticket_sale_price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('ticket_sale_time', models.DateTimeField()),
                ('ticket_sale_buyer', models.ForeignKey(related_name='user_who_bought_ticket', to='restful.ClubUser')),
                ('ticket_sale_club', models.ForeignKey(to='restful.Club')),
                ('ticket_sale_seller', models.ForeignKey(related_name='employee_who_sold_ticket', to='restful.ClubUser')),
                ('ticket_sale_type', models.ForeignKey(to='restful.TicketType')),
            ],
        ),
        migrations.CreateModel(
            name='UserRight',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('user_right_text', models.CharField(max_length=45)),
                ('user_right_club', models.ForeignKey(to='restful.Club')),
                ('user_right_user', models.ForeignKey(to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='WorkoutSchedule',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('scheduled_workout_cancel_time', models.DateTimeField(null=True)),
                ('scheduled_workout', models.ForeignKey(to='restful.Club')),
                ('scheduled_workout_canceled_by', models.ForeignKey(related_name='employee_who_canceled_scheduling', to='restful.ClubUser', null=True)),
                ('scheduled_workout_input_by', models.ForeignKey(related_name='employee_who_scheduled_workout', to='restful.ClubUser')),
                ('scheduled_workout_trainer', models.ForeignKey(related_name='employee_trainer_of_workout', to='restful.ClubUser')),
                ('scheduled_workout_type', models.ForeignKey(to='restful.WorkoutType')),
            ],
        ),
        migrations.CreateModel(
            name='WorkoutSigning',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('signing_input_time', models.DateTimeField()),
                ('signing_cancelled_by', models.ForeignKey(related_name='employee_who_cancelled_signing', to='restful.ClubUser', null=True)),
                ('signing_club', models.ForeignKey(to='restful.Club')),
                ('signing_input_by', models.ForeignKey(related_name='user_who_input_signing', to='restful.ClubUser')),
                ('signing_scheduled_workout', models.ForeignKey(to='restful.WorkoutSchedule')),
                ('signing_visitor', models.ForeignKey(related_name='user_who_signed_to_come', to='restful.ClubUser')),
            ],
        ),
        migrations.CreateModel(
            name='WorkoutVisit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('visit_input_time', models.DateTimeField()),
                ('visit_club', models.ForeignKey(to='restful.Club')),
                ('visit_input_by', models.ForeignKey(related_name='employee_who_input_coming_to_workout', to='restful.ClubUser')),
                ('visit_scheduled_workout', models.ForeignKey(to='restful.WorkoutSchedule')),
                ('visit_visitor', models.ForeignKey(related_name='user_who_came_to_workout', to='restful.ClubUser')),
            ],
        ),
        migrations.AddField(
            model_name='ticketfreez',
            name='ticket_freez_sold_ticket',
            field=models.ForeignKey(to='restful.TicketSale'),
        ),
    ]
