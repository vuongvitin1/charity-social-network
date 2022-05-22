import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import { Card, Container, Spinner } from 'react-bootstrap'
import { UserContext } from '../../App';

const Profile = () => { 
    const src = 'https://res.cloudinary.com/dwsyse8jk/image/upload/v1630359671/t02qq60zya71rmrg5gfe.jpg';
    const [user, dispatch] = useContext(UserContext)
    return (
        <Container>
            <p className="text-center">
                <h1>Thông tin người dùng {user.last_name}</h1>
            </p>
            <Grid container xs="12">
                <Grid xs="4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={src} />
                    </Card>
                </Grid>
                <Grid xs="8">
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p>{user.email}</p>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default Profile