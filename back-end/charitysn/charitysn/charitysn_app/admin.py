from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import *


class PostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


class UserAdmin(admin.ModelAdmin):
    readonly_fields = ["avatar_display"]

    def avatar_display(self, user):
        return mark_safe("<img src='/{img_url}' width='120px' />".format(img_url=user.avatar.name))


class PostAdmin(admin.ModelAdmin):
    #readonly_fields = ["image_display"]
    form = PostForm

    #def image_display(self, post):
        #return mark_safe("<img src='/{img_url}' width='120px' />".format(img_url=post.image.name))


# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(BidProduct)
admin.site.register(Comment)
admin.site.register(User, UserAdmin)
admin.site.register(Like)
admin.site.register(Reply)
admin.site.register(PostTag)
admin.site.register(Report)
admin.site.register(Bid)
