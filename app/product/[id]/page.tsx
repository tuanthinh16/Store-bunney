'use client'
import StarRating from '@/components/ITEM/item.rating';
import axios from 'axios';
import { Cardo } from 'next/font/google';
import React, { useState } from 'react'
import { Button, Card, Container, Modal } from 'react-bootstrap'

const ProductDetail = ({params}:{params:{id:string}}) => {
    const [product, setProduct] = React.useState<any[]>([]);
    
    const fetchData =()=>{
        const url="/api/product?id="+params.id;
        axios.get(url)
        .then(response =>{
            setProduct([response.data['data']])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
        
    }
    React.useEffect(()=>{
        fetchData(); 
        document.title = "Bunney | Product";
    },[])
    const [size,setSize] = React.useState(true);
    const [mobile,setMobile] = React.useState(false);
    React.useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth > 1000);
            setMobile(window.innerWidth < 400);
            
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Container>
            <h1>Product detail</h1>
            <div>
                {mobile?(
                    <ItemProductDetailMB product={product}/>
                ):(
                    <ItemProductDetail product={product}/>
                )}
            </div>
        </Container>
    )
}

export default ProductDetail;
const ItemProductDetail = ({product}:any)=>{
    const [image,setImage]= useState('');
    const [quantity,setQuantity]= useState(1);
    const [id,setId] = useState('');
    const handleQuantityChange = (newQuantity: any) => {
        setQuantity(newQuantity);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (_id:any) => {
        setId(_id);
        setShow(true);
    }
    return(
        <>
            {product?.map((item: any, index:number)=>(
                <div key={index} style={{display:'flex',border:'1px solid black',borderRadius:'20px',padding:'3rem',position:'relative'}}>
                    <div style={{maxWidth:'40%'}}>
                        <Card.Img variant="left" src={image} width={400} height={300}/>
                        {item['imageUrl']?.map((_image: any, index:number)=>(
                            <Card.Img variant="right" src={_image} onClick={()=> setImage(_image)} width={100} height={100} key={index}/>
                        ))}
                    </div>
                    
                    <div style={{marginLeft:'3rem'}}>
                        <Card.Title style={{fontWeight:'bold',padding:'1rem 0'}}>{item['title']}</Card.Title>
                        <Card.Body>
                            <div style={{maxHeight:'200px'}}>
                                {item['description']}
                            </div>
                            <div style={{position:'relative',bottom:'5px',paddingTop:'2rem'}}>
                                <div style={{display:'flex'}}>
                                    
                                    <div style={{marginRight:'2rem',paddingTop:5}}>
                                    <b>Rate: </b>{item['rating']['rate']}
                                    </div>
                                    <StarRating initialRating={item['rating']['rate']}/>
                                    
                                </div>
                                <div>
                                    <b>Price: </b><i>{item['price']}{'$'}</i>
                                </div>
                                <div>
                                    <QuantitySelector onChange={handleQuantityChange} />
                                    <Button variant='outline-success' style={{width:'30%',alignContent:'center',justifyContent:'center',borderRadius:'20px',margin:'2rem'}} onClick={()=> handleShow(item['_id'])}>BUY</Button>
                                </div>
                            </div>
                        </Card.Body>
                        
                    </div>
                </div>
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Buy product id: {id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure Buy {quantity} ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
const ItemProductDetailMB = ({product}:any)=>{
    const [image,setImage]= useState('');
    const [quantity,setQuantity]= useState(1);
    const [id,setId] = useState('');
    const handleQuantityChange = (newQuantity: any) => {
        setQuantity(newQuantity);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (_id:any) => {
        setId(_id);
        setShow(true);
    }
    return(
        <>
            {product?.map((item: any, index:number)=>(
                <div key={index} style={{border:'1px solid black',borderRadius:'20px',padding:'1.5rem',position:'relative'}}>
                    <div style={{maxWidth:'40%'}}>
                        <Card.Img variant="left" src={item['image']}  height={200}/>
                    </div>
                    
                    <div style={{marginLeft:'1rem'}}>
                        <Card.Title style={{fontWeight:'bold',padding:'1rem 0'}}>{item['title']}</Card.Title>
                        <Card.Body>
                            <div style={{maxHeight:'200px'}}>
                                {item['description']}
                            </div>
                            <div style={{position:'relative',bottom:'5px',paddingTop:'2rem'}}>
                                <div style={{display:'flex'}}>
                                    
                                    <div style={{marginRight:'1rem',paddingTop:5}}>
                                    <b>Rate: </b>{item['rating']['rate']}
                                    </div>
                                    <StarRating initialRating={item['rating']['rate']}/>
                                    
                                </div>
                                <div>
                                    <b>Price: </b><i>{item['price']}{'$'}</i>
                                </div>
                                <div style={{maxWidth:'90%'}}>
                                    <QuantitySelector onChange={handleQuantityChange} />
                                    <Button variant='outline-success' style={{width:'30%',alignContent:'center',justifyContent:'center',borderRadius:'20px',margin:'2rem'}} onClick={()=>handleShow(item['_id'])}>BUY</Button>
                                </div>
                            </div>
                        </Card.Body>
                        
                    </div>
                </div>
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Buy product id: {id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure Buy {quantity} ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
const QuantitySelector = ({ onChange }:any) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: { target: { value: string; }; }) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
        onChange && onChange(newQuantity);
    };

    return (
        <div className="quantity-selector" style={{display:'flex',maxWidth:'90%'}}>
        <label htmlFor="quantity" style={{paddingTop:5,marginRight:5,fontWeight:'bold'}}>Quantity:</label>
        <select
            id="quantity"
            className="form-select"
            value={quantity}
            onChange={handleQuantityChange}
        >
            {[...Array(10).keys()].map((value) => (
            <option key={value + 1} value={value + 1}>
                {value + 1}
            </option>
            ))}
        </select>
        </div>
    );
    };
