# Generated by Django 4.0.2 on 2022-05-22 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charitysn_app', '0016_alter_comment_image_alter_post_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.CharField(default='rong', max_length=255),
        ),
    ]
