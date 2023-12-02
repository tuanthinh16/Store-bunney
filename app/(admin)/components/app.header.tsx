'use client'
import React, { useState } from 'react'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container style={{maxWidth:'100%',paddingTop:'1rem',backgroundColor:'rgb(124,124,124,124)',marginLeft:'30rem',borderRadius:'10px',minHeight:'4rem',marginTop:'1rem',position:'fixed',zIndex:1}}>
            <Row>
                <Col aria-colspan={2}>
                    <div style={{}}>
                        Bunney Admin Dashboard
                    </div>
                </Col>
                <Col>
                    <div style={{display:'flex',right:'2rem'}}>
                        <div>
                            <Button variant='outlined'><NotificationsIcon/></Button>
                        </div>
                        <div>
                            <Button onClick={handleShow} variant='outlined'><SettingsIcon/></Button>
                        </div>
                        <div style={{}}>
                            <Button variant='outlined'><AccountCircleIcon/></Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    )
}

export default Header;