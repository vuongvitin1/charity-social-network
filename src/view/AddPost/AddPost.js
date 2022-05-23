import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import Api, { endpoints } from '../../configs/Api'

const AddPost = () => {
    const [tags, setTags] = useState()
    const [user, dispatch] = useContext(UserContext)
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [newTag, setNewTag] = useState([]);
    
    // const [newPost, setNewPost] = useState({
    //     "title": '',
    //     "content": '',
    //     "privacy": "",
    //     "user": "",
    //     "tags": []
    // })
    const nav = useNavigate()

    // const change = (obj) => {
    //     setNewPost({
    //         ...newPost,
    //         ...obj
    //     })
    // }

    useEffect(() => {
        const loadTags = async () => {
            const res = await Api.get(endpoints['tags'])
            console.log(res.data.results)
            setTags(res.data.results)
        }

        loadTags()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()

        let data = new FormData()
        data.append('title', title)
        data.append('content', content)
        data.append('privacy', "PUBLIC")
        data.append('user', user.id)
        data.append('tags', newTag)
        data.append('active', 'True')
        // console.log(data)
        try {
            const res = await Api.post(endpoints['add-post'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.status === 201) {
                alert("Them moi thanh cong ")
            }

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <Container>
            <h1>
                Thêm mới bài viết
            </h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="name@example.com" onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="name@example.com" onChange={(e) => setContent(e.target.value)} />
                </Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Select className='form-control mb-3' aria-label="Default select example" onChange={(e) => setNewTag(e.target.value)}>
                    {
                        tags && tags.length > 0 &&
                        tags.map((item) => <option value={item.id}>{item.name}</option>)
                    }
                </Form.Select>
                <Button type="submit">Thêm bài viết</Button>
            </Form>
        </Container>
    )
}

export default AddPost