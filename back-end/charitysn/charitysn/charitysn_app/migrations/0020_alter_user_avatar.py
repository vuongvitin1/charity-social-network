# Generated by Django 4.0.2 on 2022-05-22 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charitysn_app', '0019_alter_post_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(null=True, upload_to='static/user/%Y/%m'),
        ),
    ]