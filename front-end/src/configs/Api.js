import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    'posts': '/posts/',
    "oauth2-info": "/oauth2-info/",
    'post': (postId) => `/posts/${postId}/post/`,
    'post-detail': (postId) => `/posts/${postId}/`,
    'login': '/o/token/',
    'current_user': '/users/current-user/',
    'like-posts': '/likes/',
    'comments': (postId) => `/posts/${postId}/comments/`,
    'register': '/users/',
    "add-comments": "/user-comments/",
    "put-post": "/posts/posts_update/",
    "tags": "/tags/",
    "add-post": "/posts/"
}

export const authAxios = () => axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
}) 