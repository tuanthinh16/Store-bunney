import {fetchData} from '../apiService';
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: Request,response: Response){
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    const _limit = searchParams.get('limit');
    if (_limit){
        try {
            const _data = {
                "collection": "Products",
                "database": "FirstApi",
                "dataSource": "RustData",
                "limit":parseInt(_limit)
            };
            
            const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/find', 'post', _data);
            return NextResponse.json({data:userData['documents']},{status:200});
        } catch (error) {
            console.error('Error fetching product data:', error);
            throw error;
        }
    }
    if (!_id) {
        // Handle the case when _id is null or undefined
        try {
            const _data = {
                "collection": "Products",
                "database": "FirstApi",
                "dataSource": "RustData",
            };
            
            const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/find', 'post', _data);
            return NextResponse.json({data:userData['documents']},{status:200});
        } catch (error) {
            console.error('Error fetching product data:', error);
            throw error;
        }
    }
    else{
        try {
            const _data = {
                "collection": "Products",
                "database": "FirstApi",
                "dataSource": "RustData",
                "filter":{
                    "_id": { "$oid": _id }
                }
            };
            
            const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/findOne', 'post', _data);
            return NextResponse.json({data:userData['document']},{status:200});
        } catch (error) {
            console.error('Error fetching product data:', error);
            throw error;
        }
    }
    
    
}
export async function POST(request:NextRequest) {
    const product = await request.formData();
    try {
        const _data = {
            "collection": "Products",
            "database": "FirstApi",
            "dataSource": "RustData",
            "document": {
                "title":product.get('title'),
                "description": product.get('description'),
                "category": product.get('category'),
                "price": product.get('price'),
                "rating":product.get('rating')
            }
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/insertOne', 'post', _data);
        if(userData){
            return NextResponse.json({data:userData},{status:200})
        }else{
            return NextResponse.json({err:"Error when insert product"},{status:200})
        }
    } catch (error) {
        console.error('Error insert product :', error);
        return NextResponse.json({err:error},{status:200})
    }
}
export async function PUT(request:NextRequest){
    const product = await request.formData();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    try {
        const data = {
            "collection": "Products",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter": {
                "_id": { "$oid": _id }
            },
            "update": {
                "$set": {
                    "title":product.get('title'),
                    "description": product.get('description'),
                    "category": product.get('category'),
                    "image": product.get('image'),
                    "price": product.get('price'),
                    "rating":product.get('rating')
                }
            }
        };
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/updateOne', 'post', data);
        return NextResponse.json({data:userData},{status:200})
    } catch (error) {
        console.error('Error update product:', error);
    
        return NextResponse.json({err:error},{status:400})
    }
}
export async function DELETE(request:NextRequest){
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    try {
        const data = {
            "collection": "Products",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter": {
                "_id": { "$oid": _id }
            },
        };
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/deleteOne', 'post', data);
        return NextResponse.json({data:userData},{status:200})
    } catch (error) {
        console.error('Error delete product:', error);
    
        return NextResponse.json({err:error},{status:400})
    }
}