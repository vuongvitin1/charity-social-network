import { Grid, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Row,  Spinner, Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import Item from '../layout/Item'



const Home = () => {
    const [courses, setCourses] = useState([])
    const [q] = useSearchParams()
    const [count,setCount] = useState(0)


    // chuyển trang
    const [pageOn, setPageOn] = useState(1);

    const [jobs, setJobs] = useState([]);

    const [pageJ, setPageJ] = useState(1);
    const fetchJobs = async (value) => {
        const _path = endpoints["viec-lam"] + (value ? `?page=${value}` : `?page=1`)

        Api.get(_path).then(res => {
            setCourses(res.data.results)
            setCount(res.data.count)
        })
    }

    const handleChangePageJ = (event, value) => {
        console.info(value);
        setPageJ(value);
        fetchJobs(value);
    };
   


    useEffect(() => {
        const loadCourses = async () => {
            let query = ""
            const cateId = q.get("category_id")
            if (cateId !== null)
                query = `category_id=${cateId}`

            const kw = q.get("kw")
            if (kw !== null)
                query = `kw=${kw}`
            
            console.info(`${endpoints['viec-lam']}?${query}`)
            const res = await Api.get(`${endpoints['viec-lam']}?${query}`)
            setCourses(res.data.results)
            setCount(res.data.count)
            
            //Chuyen trang
            // const _path = endpoints["viec-lam"] + (value ? `?page=${value}` : `?page=1`)
            // const res = await fetch("/courses.json")
            // let data = await res.json()

            // const cateId = q.get("category_id")
            // if (cateId != null)
            //     data = data.filter(d => d.category_id === parseInt(cateId))

            // const kw = q.get("kw")
            // if (kw != null)
            //     data = data.filter(d => d.subject.indexOf(kw) >= 0)

            // setCourses(data)
        }

        loadCourses()
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
                <Pagination count={Math.ceil(count / 2)} page={pageOn} onChange={handleChangePageJ} size='large' />
            </Grid>

            
            {courses.length === 0 && <Spinner animation="grow" />}
            
            
            <Row>
                {courses.map(c => <Item obj={c}  />)}
            </Row>
        </Container>
      
    )
}


export default Home