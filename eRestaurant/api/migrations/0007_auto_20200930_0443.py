# Generated by Django 3.1 on 2020-09-30 04:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20200929_1222'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reward',
            name='title',
        ),
        migrations.AlterField(
            model_name='reward',
            name='date_created',
            field=models.DateField(default=datetime.date(2020, 9, 30)),
        ),
    ]