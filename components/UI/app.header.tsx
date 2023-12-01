'use client'
import Image from 'next/image'
import React from 'react'
import { Badge, Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap'
import logo from '../../public/logo.png';
import styled from 'styled-components';
import Link from 'next/link';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/navigation';

const Header = () => {
    const route = useRouter();
    const [size,setStize] = React.useState(true);
    const [mobile,setMobile] = React.useState(false);
    React.useEffect(() => {
        const handleResize = () => {
            setStize(window.innerWidth > 1000);
            setMobile(window.innerWidth < 400);
            
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Container fluid="xxl" style={{backgroundColor:'rgba(78, 73, 73, 0.247)',marginLeft:0,position:'fixed',zIndex:1,maxWidth:'100%'}}>
            <Row style={{width:'100%',display:'flex',paddingTop:'1rem'}}>
                <Col style={{display:'flex',maxWidth:'85%'}}>
                    {mobile?(
                        <>
                        <Image
                        src={logo}
                        alt='logo'
                        width={80}
                        height={30}  
                        onClick={()=>route.push("/")}/>
                        <InputGroup style={{maxHeight:'4rem',maxWidth:'10rem',paddingTop:'0.1rem',paddingBottom:'0.3rem',marginRight:'0.5rem'}}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                                style={{borderRadius:'10px'}}
                                />
                                {/* <Button style={{borderRadius:'10px',marginLeft:1,alignItems:'center',width:'40%'}}><SearchOutlinedIcon fontSize='small'/></Button> */}
                            </InputGroup>
                            </>
                    ):
                    (
                        <>
                            <Image
                            src={logo}
                            alt='logo'
                            width={300}
                            height={80} 
                            onClick={()=>route.push("/")}/>
                            <InputGroup style={{maxHeight:'4rem',maxWidth:'20rem',paddingTop:'1rem'}}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                                style={{borderRadius:'10px'}}
                                />
                                <Button style={{borderRadius:'10px',marginLeft:4}}><SearchOutlinedIcon/></Button>
                            </InputGroup>
                        </>
                    )}
                    
                    
                </Col>
                {size&&(
                    <Col style={{margin:'auto'}}>
                        <Link href={"/product"} style={{textDecoration:'none',marginRight:'1rem',fontWeight:'bold'}}>PRODUCTS</Link>
                        <Link href={"/"} style={{textDecoration:'none',marginRight:'1rem',fontWeight:'bold'}}>CATEGORIES</Link>
                        <Link href={"/"} style={{textDecoration:'none',marginRight:'1rem',fontWeight:'bold'}}>WALLET</Link>
                    </Col>
                )}
                <Col style={{right:'1px',position:'relative',display:'flex',margin:'auto',justifyContent:'right'}}>
                    {!mobile&&(
                        <div style={{marginRight:'1rem'}}>
                            <Button variant='outline-primary' style={{borderRadius:'10px'}}>
                                <NotificationsNoneOutlinedIcon/>
                                <Badge bg="secondary">9</Badge>
                            </Button>
                        </div>
                    )}
                    {mobile?(
                        <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:'10px',paddingBottom:'0.3rem'}}>
                            <Person3OutlinedIcon/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Setting</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    ):(
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:'10px'}}>
                                <Person3OutlinedIcon/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Setting</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Header;
const MyButton = styled.button`
  /* Thêm các thuộc tính CSS mong muốn cho button */
    background-color: rgba(78, 73, 73, 0.247);
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    /* Hover effect */
    &:hover {
        background-color: #2980b9;
    }
`;
