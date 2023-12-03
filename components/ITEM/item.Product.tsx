import React from 'react'
import { Button, Card } from 'react-bootstrap'
import StarRating from './item.rating'
import { useRouter } from 'next/navigation'

const ProductItem = ({product}:any) => {
    const route = useRouter();
    return (
        <>
            {product?.map((item:any,index:number)=>(
                <Card style={{ width: '20rem' ,padding:'2rem',borderRadius:'20px',marginRight:'2rem'}} key={index} onClick={()=>route.push("/product/"+item['_id'])}>
                <Card.Img variant="top"src={item && item.imageUrl && item.imageUrl[0] ? item.imageUrl[0] : 'fallback_image_url'} style={{maxHeight:'300px'}}/>
                <Card.Body>
                    <Card.Text style={{color:'green'}}>
                        {item['category']}
                    </Card.Text>
                    <Card.Title>{item['title']}</Card.Title>
                    <Card.Text>{"Price: "}{item['price']}{'$'}</Card.Text>
                    <Card.Text style={{display:'flex'}}>
                        <StarRating initialRating={item['rating']?.['rate']}/>
                        <p style={{marginTop:4,paddingLeft:4}}>{item['rating']?.['rate']}</p>
                    </Card.Text>
                    <Button variant="outline-success" style={{justifyContent:'center',position:'absolute',bottom:'10px',width:'70%',borderRadius:'25px'}}>Buy</Button>
                </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default ProductItem