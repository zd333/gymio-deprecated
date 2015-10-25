# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restful', '0005_positiontype_workout_types'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickettype',
            name='workout_types',
            field=models.ManyToManyField(to='restful.WorkoutType'),
        ),
    ]
