# Generated by Django 3.0.6 on 2020-10-11 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0004_auto_20201011_1023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
