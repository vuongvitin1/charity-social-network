import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    'categories': '/categories/',
    'posts': '/posts/',
    "oauth2-info": "/oauth2-info/",
    'lessons': (postId) => `/posts/${postId}/lessons/`,
    'lesson-detail': (lessonId) => `/lessons/${lessonId}/`,
    'login': '/o/token/',
    'current_user': '/nguoi-dung/hien-tai/',
    'like-lesson': (lessonId) => `/lessons/${lessonId}/like/`,
    'rate-lesson': (lessonId) => `/lessons/${lessonId}/rating/`,
    'lesson-comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'comments': '/comments/',
    'register': '/users/',
    "viec-lam": "/viec-lam/"
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