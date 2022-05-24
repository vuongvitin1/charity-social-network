# Generated by Django 4.0.2 on 2022-05-22 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charitysn_app', '0015_alter_comment_image_alter_post_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='comment/%Y/%m'),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post/%Y/%m'),
        ),
        migrations.AlterField(
            model_name='reply',
            name='image',
            field=models.ImageField(null=True, upload_to='reply/%Y/%m'),
        ),
    ]
