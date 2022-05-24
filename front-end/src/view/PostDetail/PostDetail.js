import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Api, { endpoints, authAxios } from '../../configs/Api'
import { UserContext } from '../../App'
import Rating from 'react-rating'
import Moment from 'react-moment'
import { Grid } from '@mui/material'
import { Badge, Button, Card, Container, Form, Image, ListGroup, Spinner } from 'react-bootstrap'

const PostDetail = () => {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const { postId } = useParams()
    const [user] = useContext(UserContext)


    useEffect(() => {
        const loadPost = async () => {
            let res = null;
            if (user != null) {
                res = await authAxios().get(endpoints['post-detail'](postId))
            } else {
                res = await Api.get(endpoints['post-detail'](postId))
            }
            // console.info(res.data)
            setPost(res.data)
        }

        loadPost()
    }, [])

    useEffect(() => {
        const loadComments = async () => {
            const res = await Api.get(endpoints['comments'](postId))
            setComments(res.data)
        }

        loadComments()
        console.info(comments)
    }, [])



    // const like = async () => {
    //     const res = await authAxios().post(endpoints['like-post'](postId))
    //     setPost(res.data)
    // }

    // const rate = async (r) => {
    //     const res = await authAxios().post(endpoints['rate-post'](postId), {
    //         'rate': r
    //     })
    //     console.info(res.data)
    //     setPost(res.data)
    // }
    const PostContent  = () => {
        return(
                <div dangerouslySetInnerHTML={{ __html:  post.content }}></div>
               
        )
    }

    
    if (post === null)
        return <Container>
            <p className="text-center"><Spinner variant="info" animation="border" />
            </p>
        </Container>

    // console.log(post.tags.name + "Vuong")


    
    return (
        <Container>
            <p className="text-center">
                <h1 className="text-info">{post.title}</h1>
            </p>
            {post.tags.map(t => <Badge key={t.id} bg="info">{t.name}</Badge>)}
            <Grid container xs="12">
                <Grid xs="4">
                    <Card style={{ width: '18rem' }}>
                        <Image src={post.image} fluid />
                    </Card>
                </Grid>
                <Grid xs="8">
                    <PostContent/>
                </Grid>
            </Grid>
            <Grid container xs="12">
                <Grid xs="12">
                    {user != null && <CommentForm postId={postId} comments={comments} setComments={setComments} />}
                    <ListGroup>
                        {comments.map(c => <ListGroup.Item>
                            <Image src={c.user.avatar} fluid width="50" roundedCircle /> {c.content} - <Moment fromNow>{c.created_date}</Moment>
                    </ListGroup.Item>)}
                    </ListGroup>
                </Grid>
            </Grid>
        </Container>
    )
}

const CommentForm = ({ postId, comments, setComments }) => {
    const [content, setContent] = useState()
    const [user] = useContext(UserContext)

    const addComment = async (event) => {
        event.preventDefault()

        const res = await authAxios().post(endpoints['add-comments'], {
            'content': content,
            'post': postId,
            'user': user.id
        })

        setComments([...comments, res.data])
    }

    return (
        <>
            <Form onSubmit={addComment} className="my-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} placeholder="Nhap binh luan" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Thêm bình luận
                </Button>
            </Form>
        </>
    )
}

export default PostDetail