# Generated by Django 3.2.9 on 2021-11-11 23:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('GIM', '0003_auto_20211111_2329'),
    ]

    operations = [
        migrations.RenameField(
            model_name='have',
            old_name='item_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='want',
            old_name='item_name',
            new_name='name',
        ),
    ]
