import React, { useState, useEffect, useContext } from 'react'
import { Container, Col, Badge, Spinner, Row, Image, Button, ListGroup, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Api, { endpoints, authAxios } from '../configs/Api'
import { UserContext } from '../App'
import Rating from 'react-rating'
import Moment from 'react-moment'

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
    }, [comments])

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

    if (post === null)
        return <Container><Spinner animation="grow" /></Container>

    return (
        <Container>
            <h1 className="text-center text-info">CHI TIET BAI HOC ({postId})</h1>
            <Row>
                <Col md={5} xs={12}>
                    <Image src={post.image} fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2>{post.subject}</h2>
                    {post.tags.map(t => <Badge key={t.id} bg="info">{t.name}</Badge>)}

                    {/* <div>
                        {user != null && <Button variant={post.like == true?'primary':'outline-primary'} onClick={like}>Like</Button>}
                        <br></br>
                        {user != null && <Rating initialRating={post.rating} onClick={rate} />}
                    </div> */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {user != null && <CommentForm postId={postId} comments={comments} setComments={setComments} />}
                    <ListGroup>
                        {comments.map(c => <ListGroup.Item>
                            <Image src={c.user.avatar_view} fluid width="50" roundedCircle /> {c.content} - <Moment fromNow>{c.created_date}</Moment>
                        </ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

const CommentForm = ({ postId, comments, setComments }) => {
    const [content, setContent] = useState()
    const [user] = useContext(UserContext)

    const addComment = async (event) => {
        event.preventDefault()

        const res = await authAxios().post(endpoints['comments'], {
            'content': content, 
            'post': postId,
            'user': user.id
        })

        setComments([...comments, res.data])
    }

    return (
        <Form onSubmit={addComment}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} placeholder="Nhap binh luan" />
            </Form.Group>
        
            <Button variant="primary" type="submit">
                Them binh luan
            </Button>
        </Form>
    )
}

export default PostDetail