# Generated by Django 5.1.1 on 2024-11-13 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dino', '0002_alter_customuser_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='levels',
            name='level',
            field=models.IntegerField(null=True, verbose_name='Уровень'),
        ),
    ]