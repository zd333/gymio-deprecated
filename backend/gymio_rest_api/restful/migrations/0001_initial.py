# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Club',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('club_name', models.CharField(max_length=20)),
                ('club_address', models.CharField(max_length=45)),
                ('club_gps_str', models.CharField(max_length=100)),
                ('club_phones', models.CharField(max_length=45)),
                ('club_email', models.CharField(max_length=45)),
                ('club_homepage', models.CharField(max_length=100)),
                ('club_key', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='PositionType',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('position_name', models.CharField(max_length=45)),
                ('position_club', models.ForeignKey(to='restful.Club')),
            ],
        ),
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('ticket_type_name', models.CharField(max_length=45)),
                ('ticket_type_cost', models.DecimalField(decimal_places=2, max_digits=6)),
                ('ticket_type_visit_amount', models.SmallIntegerField()),
                ('ticket_type_expiration', models.SmallIntegerField()),
                ('ticket_type_max_freezes', models.SmallIntegerField()),
                ('ticket_type_time', models.CharField(max_length=100)),
                ('ticket_type_weekdays', models.CharField(max_length=100)),
                ('ticket_type_is_active', models.BooleanField()),
                ('ticket_type_club', models.ForeignKey(to='restful.Club')),
            ],
        ),
    ]
