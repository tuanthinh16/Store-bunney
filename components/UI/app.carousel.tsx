'use client'
import { SetStateAction, useState } from "react";
import { items } from "../item.json";
import { Carousel } from "react-bootstrap";
import React from "react";
export default function BootstrapCarousel() {
    const { bootstrap } = items;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };
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
        <>
        {mobile?(
            <Carousel activeIndex={index} onSelect={handleSelect} style={{maxWidth:'100vw',maxHeight:'400px'}}>
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id}  interval={4000}>
                <img src={item.imageUrl} alt="slides" width='100%' height={400}/>
                <Carousel.Caption >
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <button className="btn btn-danger">Connect Us</button>
                </Carousel.Caption>
                </Carousel.Item>
            ))}
            </Carousel>
        ):(
            <Carousel activeIndex={index} onSelect={handleSelect} style={{maxWidth:'100vw',maxHeight:'750px'}}>
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id}  interval={4000}>
                <img src={item.imageUrl} alt="slides" width='100%' height={750}/>
                <Carousel.Caption >
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <button className="btn btn-danger">Connect Us</button>
                </Carousel.Caption>
                </Carousel.Item>
            ))}
            </Carousel> 
        )}
        </>
    );
}