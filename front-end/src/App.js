import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Login from './components/Login'
import myReducer from './reducers/MyReducer'
import cookies from 'react-cookies'
import Register from './components/Register'
import About from './components/About'
import NotMatch from './components/NotMatch'
import Home from './view/Home/Home'
import Profile from './view/Profile/Profile'
import AddPost from './view/AddPost/AddPost'
import PostDetail from './view/PostDetail/PostDetail'

export const UserContext = createContext()

const App = () => {
  const [user, dispatch] = useReducer(myReducer, cookies.load('current_user'))

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/add-post" element={<AddPost />} />
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