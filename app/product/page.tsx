'use client'
import ProductItem from '@/components/ITEM/item.Product';
import axios from 'axios';
import React from 'react'
import { Container } from 'react-bootstrap'

const Product = () => {
    const [product,setProduct] = React.useState<any[]>([]);
    React.useEffect(()=>{
        document.title = "Bunney | Home";
        fetchData();
    },[]);
    const fetchData =()=>{
        const url="/api/product";
        axios.get(url)
        .then(response =>{
            setProduct(response.data['data'])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    }     
    return (
        <Container>
            <h1>All Products</h1>
            <div style={{display:'flex',flexWrap:'wrap'}}>
            <ProductItem product={product}/>
            </div>
        </Container>
    )
}

export default Product;