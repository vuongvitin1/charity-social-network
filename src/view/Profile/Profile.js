import { Grid } from '@mui/material'
import React from 'react'
import { Card, Container, Spinner } from 'react-bootstrap'

const Profile = () => {
    return (
        <Container>
            <p className="text-center">
                <Spinner variant="info" animation="border" role="status" />
            </p>
            <Grid xs="12">
                <Grid xs="4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                    </Card>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default Profile