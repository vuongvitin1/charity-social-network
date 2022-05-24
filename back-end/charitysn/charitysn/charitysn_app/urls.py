from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('posts', views.PostViewSet)
router.register('users', views.UserViewSet)
router.register('comments', views.CommentViewSet)
router.register('replies', views.ReplyViewSet)
router.register('likes', views.LikeViewSet)
router.register('reports', views.ReportViewSet)
router.register('bidproducts', views.BidProductViewSet)
router.register('bids', views.BidProductViewSet)
router.register('tags', views.PostTagViewSet)

urlpatterns = [
    # Sử dụng route của rest framework để tự sinh endpoint crud cơ bản
    path('', include(router.urls)),

    # Tự define url để lấy client_id/secret dùng chứng thực lấy token
    path('oauth2-info/', views.AuthInfo.as_view()),
]
