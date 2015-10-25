# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restful', '0006_tickettype_workout_types'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='club_email',
            field=models.EmailField(max_length=45),
        ),
        migrations.AlterField(
            model_name='club',
            name='club_gps_str',
            field=models.CharField(max_length=100, blank=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='club_homepage',
            field=models.URLField(),
        ),
        migrations.AlterField(
            model_name='club',
            name='club_key',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='club_phones',
            field=models.CharField(max_length=45, blank=True),
        ),
        migrations.AlterField(
            model_name='clubuser',
            name='user_photo',
            field=models.ImageField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='expense',
            name='expense_receipt_photo',
            field=models.ImageField(upload_to=''),
        ),
    ]
