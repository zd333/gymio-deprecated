# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restful', '0004_auto_20151025_1607'),
    ]

    operations = [
        migrations.AddField(
            model_name='positiontype',
            name='workout_types',
            field=models.ManyToManyField(to='restful.WorkoutType'),
        ),
    ]
