# Generated by Django 3.1 on 2020-08-30 06:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200830_0605'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('menu_ID', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='restaurant',
            name='open_hours',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='menu_ID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.menu'),
        ),
    ]
