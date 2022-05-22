import { Grid, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Row,  Spinner, Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import Item from '../layout/Item'
import { useStyles } from './Home.style'



const Home = () => {
    const [post, setpost] = useState([])
    const [q] = useSearchParams()
    const [count,setCount] = useState(0)
    const classes = useStyles();


    // chuyển trang

    const [pageOn, setPageOn] = useState(1);
    const fetchPosts = async (value) => {
        const _path = endpoints["posts"] + (value ? `?page=${value}` : `?page=1`)

        Api.get(_path).then(res => {
            setpost(res.data.results)
            setCount(res.data.count)
        })
    }

    const handleChangePage = (event, value) => {
        console.info(value);
        setPageOn(value);
        fetchPosts(value);
    };
   


    useEffect(() => {
        const loadpost = async () => {
            let query = ""
            const cateId = q.get("category_id")
            if (cateId !== null)
                query = `category_id=${cateId}`

            const kw = q.get("kw")
            if (kw !== null)
                query = `kw=${kw}`
            
            console.info(`${endpoints['viec-lam']}?${query}`)
            const res = await Api.get(`${endpoints['viec-lam']}?${query}`)
            setpost(res.data.results)
            setCount(res.data.count)
            
            //Chuyen trang
            // const _path = endpoints["viec-lam"] + (value ? `?page=${value}` : `?page=1`)
            // const res = await fetch("/post.json")
            // let data = await res.json()

            // const cateId = q.get("category_id")
            // if (cateId != null)
            //     data = data.filter(d => d.category_id === parseInt(cateId))

            // const kw = q.get("kw")
            // if (kw != null)
            //     data = data.filter(d => d.subject.indexOf(kw) >= 0)

            // setpost(data)
        }

        loadpost()
    }, [q])
    // const paging = () => {
    //     <Pagination>
    //     <Pagination.Prev />
    //     {/* for (let i = 0; i < {count}; i++) { */}
    //         <Pagination.Item>{1}</Pagination.Item>
    //     {/* } */}
    //     <Pagination.Next />
    //         </Pagination>
    // }

    return (
        <Container>
            {/* {filterResult.count > 0 ? ( */}
            
            
                    {/* ) : (
                        <></>
                    )} */}
            <h1 className="text-center text-danger">Các dự án kiêu gọi từ thiện</h1>
            <Grid item xs={12} >
                <Pagination count={Math.ceil(count / 2)} page={pageOn} onChange={handleChangePage} size='large' />
            </Grid>

            
            {post.length === 0 && <Spinner animation="grow" />}
            
            
            <Row>
                {post.map(c => <Item obj={c}  />)}
            </Row>
        </Container>
      
    )
}


export default Home