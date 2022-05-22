import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Lesson from "./components/Lesson"
import Login from './components/Login'
import myReducer from './reducers/MyReducer'
import PostDetail from './components/PostDetail'
import cookies from 'react-cookies'
import Register from './components/Register'
import About from './components/About'
import NotMatch from './components/NotMatch'
import Home from './view/Home/Home'
import Profile from './view/Profile/Profile'

export const UserContext = createContext()

const App = () => {
  const [user, dispatch] = useReducer(myReducer, cookies.load('current_user'))

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:courseId/lessons" element={<Lesson />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<NotMatch/>}/>
        </Routes>
        <br></br>
        <br></br>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App