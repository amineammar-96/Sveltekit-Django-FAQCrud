# Generated by Django 4.2 on 2023-04-29 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_myuser_is_active_alter_myuser_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
