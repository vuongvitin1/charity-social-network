import React, { useState, useEffect, useContext } from 'react'
import { Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api, { endpoints } from '../configs/Api';
import cookies from 'react-cookies'

const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState()
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)
    useEffect(() => {
        const loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
            // let res = await fetch("/data.json")
            // let data = await res.json()
            // setCategories(data)
        }

        loadCategories()
    }, [])

    const search = (event) => {
        event.preventDefault()

        nav(`/?kw=${kw}`)
    }

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('current_user')
        dispatch({"type": "logout"})
        nav("/login")
    }

    let btn = <>
        <Link to="/login" className="nav-link text-info">Đăng nhập</Link>
        <Link to="/register" className="nav-link text-danger">Đăng ký</Link>
    </>
    if (user != null) {
        btn = <>
            <Link to="/profile" className="nav-link text-info">Chào {user.username}!</Link>
            <a href="#" onClick={logout} className="nav-link text-info">Đăng xuất</a>
        </>
    }
        

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          
            <Navbar.Brand href="#home">Mạng xã hội từ thiện</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chủ</Link>
                    {btn}
                </Nav>
                
                <Form onSubmit={search} className="d-flex">
                    <FormControl type="search" name="kw" value={kw}
                                 onChange={evt => setKw(evt.target.value)}
                                 placeholder="Nhap tu khoa" className="me-2" aria-label="Search" />
                    <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
            </Navbar.Collapse>
           
        </Navbar>
 
    )
}

export default Header