# Generated by Django 3.1 on 2020-10-18 07:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_order_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff',
            name='tax_file_number',
        ),
    ]