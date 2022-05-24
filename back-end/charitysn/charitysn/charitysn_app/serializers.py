from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "content", "user", "created_date"]

    extra_kwargs = {
        'iamge': {'write_only': 'true'}
    }


class ReplySerializer(ModelSerializer):
    class Meta:
        model = Reply
        fields = ["id", "content", "image", "user", "comment", "created_date"]


class BidProductSerializer(ModelSerializer):
    class Meta:
        model = BidProduct
        fields = '__all__'


class BidSerializer(ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'


class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post']


class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'reason', 'created_date']


class PostTagSerializer(ModelSerializer):
    class Meta:
        model = PostTag
        fields = '__all__'


class PostSerializer(ModelSerializer):
    post_likes = serializers.SerializerMethodField()
    # tags = PostTagSerializer(many=True)

    def get_post_likes(self, obj):
        return obj.post_likes.count()

    def get_image(self, obj):
        request = self.context['request']
        # if obj.image and not obj.image.name.startswith('/static'):
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Post
        fields = ["id", "title", "image", 'content', 'tags', "privacy", "created_date", "user", "post_likes", "active"]


class UserSerializer(ModelSerializer):
    # avatar = SerializerMethodField()

    def get_avatar(self, obj):
        request = self.context['request']
        # if obj.avatar and not obj.avatar.name.startswith('/static'):
        path = '/static/%s' % obj.avatar.name

        return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ["id", "avatar", "first_name", "last_name", "email",
                  "username", "password", "date_joined"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user
