# Generated by Django 3.1 on 2020-10-17 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201017_0001'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='restaurant_name',
            field=models.CharField(max_length=60, null=True),
        ),
    ]