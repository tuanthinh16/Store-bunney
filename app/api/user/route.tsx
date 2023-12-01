import {fetchData} from '../apiService';
import {NextRequest, NextResponse } from 'next/server';


export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const _username = searchParams.get('username');
    try {
        const _data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter":{
                "username": _username,
            }
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/findOne', 'post', _data);
        return NextResponse.json({data:userData['documents']},{status:200});
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
export async function POST(request:NextRequest) {
    const user = await request.formData();
    try {
        const _data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "document": user
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/insertOne', 'post', _data);
        if(userData){
            return NextResponse.json({data:userData},{status:200})
        }else{
            return NextResponse.json({err:"Error when insert user"},{status:200})
        }
    } catch (error) {
        console.error('Error insert user :', error);
        return NextResponse.json({err:error},{status:200})
    }
}
export async function PUT(request:NextRequest){
    const user = await request.formData();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    try {
        const data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter": {
                "_id": { "$oid": _id }
            },
            "update": {
                "$set": user
            }
        };
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/updateOne', 'post', data);
        return NextResponse.json({data:userData},{status:200})
    } catch (error) {
        console.error('Error update user:', error);
    
        return NextResponse.json({err:error},{status:400})
    }
}
export async function DELETE(request:NextRequest){
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');
    try {
        const data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter": {
                "_id": { "$oid": _id }
            },
        };
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/deleteOne', 'post', data);
        return NextResponse.json({data:userData},{status:200})
    } catch (error) {
        console.error('Error update user:', error);
    
        return NextResponse.json({err:error},{status:400})
    }
}
