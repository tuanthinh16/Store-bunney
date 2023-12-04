'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { Container } from 'react-bootstrap';
import CarouselComponent from '@/components/UI/app.carousel';
import React from 'react';
import axios from 'axios';
import ProductItem from '@/components/ITEM/item.Product';
import { SessionProvider, useSession } from 'next-auth/react';
import Header from '@/components/UI/app.header';
import Footer from '@/components/UI/app.footer';


export default function Home() {

  const [product,setProduct] = React.useState<any[]>([]);
  const range = 10;
  React.useEffect(()=>{
    document.title = "Bunney | Home";
    fetchData();
  },[]);
  const fetchData =()=>{
      const url="/api/product?limit="+range;
      axios.get(url)
      .then(response =>{
          setProduct(response.data['data'])
      })
      .catch(error=>{
          console.error("Err: "+error)
      });
  }     
  return (
      <Container style={{maxWidth:'100vw'}}>
        <div>
          <Header/>
        </div>
        <div style={{marginTop:'7rem'}}>
          <div>
            <CarouselComponent/>
          </div>
          
          <div style={{paddingTop:'3rem'}}>
          <h2>Product</h2>
            <div style={{display:'flex',flexWrap:'wrap'}}>
              
              <ProductItem product={product}/>
            </div>
          </div>
          <Footer/>
        </div>
        
      </Container>
  );
}
