import React, { memo, useContext, useEffect, useState } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Api, { authAxios, endpoints } from '../configs/Api';
import { UserContext } from '../App';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Item = (props) => {
    const [like, setLike] = useState()
    const [user] = useContext(UserContext)
    const [checkLike, setCheckLike] = useState(false)
    let btnLike

    //Lay du lieu Like tu bai viet
    useEffect(() => {
        const loadLesson = async () => {
            setLike(props.obj.post_likes)
        }
        loadLesson()
    }, [])

    const BtnLike = ({ checkLike }) => {
        // checkLike co gia tri la true / false
        if (checkLike && user != null) {  // checkLike === true
            return (
                btnLike = <>
                    <FavoriteIcon className="text-danger" ></FavoriteIcon></>
            )
        } else { // checkLike === false (chua like)
            return (
                btnLike = <>
                    <FavoriteBorderIcon className="text-danger" ></FavoriteBorderIcon>
                </>
            )
        }
    }

    const addLike = async (event) => {
        if (!checkLike) {
            setLike(like + 1)

            let data = new FormData()
            data.append('user', user.id)
            data.append('post', props.obj.id)
            try {
                const res = await Api.post(endpoints['like-posts'], data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (res.status === 201) {
                    console.log("Like + 1 !")
                    setCheckLike(true)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    // const [v, ssa, vsdas] = 

    // console.log(props.obj)
    let sr = "https://res.cloudinary.com/dwsyse8jk/image/upload/v1653275205/samples/191000223_4102555249824894_179774710688888086_n_ryuzyf.jpg"
    console.log(props.obj)
    // if(props.obj.image == null )
    // props.obj.image
    return (
        <Col md={4}>
            <Card className='mt-5'>
                <Card.Img style={{ "width": "100%", "height": "375px" }} variant="top" fluid="true" src={props.obj.image ? props.obj.image : sr} />
                <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: props.obj.title }} />
                    <Link to={`/posts/${props.obj.id}`} className="btn btn-info">Chi tiết</Link>
                    &nbsp;
                    &nbsp;
                    <span class="font-icon-wrapper" onClick={() => { addLike() }} >
                        {/* {btnLike} */}
                        <button type="button" class="btn btn-link"><BtnLike checkLike={checkLike} /></button>
                    </span>
                    <span> {like} like</span>
                    1                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(Item)