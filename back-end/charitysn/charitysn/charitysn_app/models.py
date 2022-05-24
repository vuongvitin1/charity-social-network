from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


# Create your models here.


class User(AbstractUser):
    # Biến static để đánh dấu vai trò người dùng
    ADMIN = 'ADMIN'
    USER = 'USER'
    ROLE = [
        (ADMIN, 'ADMIN'),
        (USER, 'USER')
    ]
    email = models.CharField(max_length=50, null=True, unique=True, blank=True)
    role = models.CharField(
        max_length=10,
        choices=ROLE,
        default='USER'
    )
    avatar = models.ImageField(upload_to='static/user/%Y/%m', null=True, blank=True)


class Report(models.Model):
    NON_PAYMENT = 'Người dùng đấu giá nhưng không thanh toán'
    ILLEGAL_WORDS = 'Người dùng dùng từ ngữ không đúng đắn'
    TYPE = [
        (NON_PAYMENT, 'người dùng đấu giá nhưng không thanh toán'),
        (ILLEGAL_WORDS, 'người dùng dùng từ ngữ không đúng đắn')
    ]
    reason = models.CharField(max_length=50, choices=TYPE, null=False)
    user_reported = models.ForeignKey(User, on_delete=models.CASCADE, related_name="denounced")
    user_report = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accused")
    created_date = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_date = models.DateTimeField(auto_now=True, null=False, blank=False)


class Post(models.Model):
    PUBLIC = 'PUBLIC'
    PRIVATE = 'PRIVATE'
    ACCESS_MODIFIER = [
        (PUBLIC, 'PUBLIC'),
        (PRIVATE, 'PRIVATE')
    ]
    content = RichTextField()
    privacy = models.CharField(choices=ACCESS_MODIFIER, default=PUBLIC, null=False, max_length=10)
    like_count = models.IntegerField
    created_date = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_date = models.DateTimeField(auto_now=True, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post_user")
    tags = models.ManyToManyField('PostTag', blank=True, related_name="post_tags")
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='post/%Y/%m', null=True, blank=True)
    title = models.CharField(max_length=255, unique=False, default="rong")

    def __str__(self):
        return self.title


class Like(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_likes")


class Comment(models.Model):
    content = models.CharField(max_length=150, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_comments")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="reply_comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="replies")
    content = models.CharField(max_length=150, null=False)
    image = models.ImageField(upload_to='reply/%Y/%m', null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)


class PostTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class BidProduct(models.Model):
    start_price = models.DecimalField(max_digits=65, decimal_places=2)
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    end_time = models.DateTimeField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bid_products")
    active = models.BooleanField(default=True)


class Bid(models.Model):
    price = models.DecimalField(max_digits=65, decimal_places=2)
    time_bid = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bids")
    bid_prod = models.ForeignKey(BidProduct, on_delete=models.CASCADE, related_name="bid_prod_bid")
    is_win = models.BooleanField(default=False)
