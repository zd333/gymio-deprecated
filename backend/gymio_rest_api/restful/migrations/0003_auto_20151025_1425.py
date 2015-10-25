# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restful', '0002_auto_20151025_1413'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clubuser',
            old_name='user_position_id',
            new_name='user_position',
        ),
        migrations.AddField(
            model_name='clubuser',
            name='user_club',
            field=models.ForeignKey(default=1, to='restful.Club'),
            preserve_default=False,
        ),
    ]
