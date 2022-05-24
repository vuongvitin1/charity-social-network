from operator import ge
from typing import Union

from django.conf import settings
from django.http import Http404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from rest_framework import viewsets, permissions, generics, status
from rest_framework.parsers import MultiPartParser
from .models import *


# Create your views here.
class PostViewSet(viewsets.ViewSet,
                  generics.CreateAPIView,
                  generics.ListAPIView,
                  generics.RetrieveAPIView,
                  generics.UpdateAPIView):
    queryset = Post.objects.filter(active=True).order_by("-id")
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action in ['add_comment', 'add_tag', 'take_action', 'report']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=True, url_path='comments')
    def get_comments(self, request, pk):
        comments = self.get_object().post_comments.all()

        return Response(CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path="post-tags")
    def add_tag(self, request, pk):
        try:
            post = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            tags = request.data.get("tags")
            if tags is not None:
                for tag in tags:
                    t, _ = PostTag.objects.get_or_create(name=tag)
                    post.tags.add(t)

                post.save()

        return Response(PostSerializer(post, context={"request": request}).data,
                        status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True, url_path="add-comment")
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(content=content,
                                       post=self.get_object(),
                                       user=request.user)
            return Response(CommentSerializer(c).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    # @action(methods=['post'], detail=True, url_path="like")
    # def take_action(self, request, pk):
    #     try:
    #         action_type = int(request.data['type'])
    #     except Union[IndexError, ValueError]:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         action = Like.objects.create(types=action_type,
    #                                      user=request.user,
    #                                      post=self.get_object())
    #
    #         return Response(LikeSerializer(action).data,
    #                         status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet,
                  generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['get_current_user', 'report']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path="current-user")
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user, context={"request": request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path="report")
    def report(self, request, pk):
        try:
            reason_type = request.data('reason')
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Report.objects.create(reason=reason_type,
                                      user_reported=request.user,
                                      user_report=self.get_object())

        return Response(LikeSerializer(action).data,
                        status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet,
                     generics.DestroyAPIView,
                     generics.UpdateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().user:
            super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().user:
            super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class ReportViewSet(viewsets.ViewSet,
                    generics.CreateAPIView,
                    generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class ReplyViewSet(viewsets.ViewSet,
                   generics.CreateAPIView,
                   generics.DestroyAPIView,
                   generics.UpdateAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class BidProductViewSet(viewsets.ViewSet,
                        generics.CreateAPIView,
                        generics.ListAPIView,
                        generics.RetrieveAPIView,
                        generics.DestroyAPIView,
                        generics.UpdateAPIView):
    queryset = BidProduct.objects.all()
    serializer_class = BidProductSerializer


class BidViewSet(viewsets.ViewSet,
                 generics.CreateAPIView,
                 generics.ListAPIView,
                 generics.UpdateAPIView,
                 generics.DestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer


class LikeViewSet(viewsets.ViewSet,
                  generics.CreateAPIView,
                  generics.DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class PostTagViewSet(viewsets.ViewSet,
                     generics.CreateAPIView,
                     generics.DestroyAPIView,
                     generics.ListAPIView):
    queryset = PostTag.objects.all()
    serializer_class = PostTagSerializer


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
