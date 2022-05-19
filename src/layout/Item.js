import React, { memo } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Item = (props) => {
    let url = `/courses/${props.obj.id}/lessons`
    let txt = "Cac bai hoc"
    // if (props.isLesson === true) {
        txt = "Chi tiet"
        url = `/lessons/${props.obj.id}`
    // }
    let sr = "https://res.cloudinary.com/dwsyse8jk/image/upload/v1652948118/TourWeb/278683097_164448992637331_5117298645844634605_n_smyjvb.jpg"
    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" fluid="true" src={sr} />
                <Card.Body>
                    <Card.Text>TRẺ NEO ĐƠN CẦN GIÚP ĐỠ</Card.Text>
                    <Card.Text>{props.obj.tieu_de}</Card.Text>
                    <Link to={url} className="btn btn-info">{txt}</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(Item)