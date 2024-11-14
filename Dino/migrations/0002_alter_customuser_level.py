# Generated by Django 5.1.1 on 2024-11-08 14:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dino', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='level',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='players_levels', to='Dino.levels', verbose_name='Уровень'),
        ),
    ]
