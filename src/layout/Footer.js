import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Alert } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container>
            <Grid xs={12}>
                <Alert variant="success">
                    <Alert.Heading>Website mạng xã hội từ thiện</Alert.Heading>
                    <p>Trần Minh Vương - Lê Anh Du &copy; 2022</p>
                </Alert>
            </Grid>
        </Container>
    )
}

export default Footer

//https://res.cloudinary.com/dxxwcby8l/image/upload/v1647930931/laoxgo0d5zx1jnwxbyqr.jpg