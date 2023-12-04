import {NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {fetchData} from '../../apiService';
import { cookies } from 'next/headers';
const secretKey = 'bunney-secret';
import { setCookie } from "cookies-next";
export async function GET(request:NextRequest) {
    
}
export async function POST(request:NextRequest) {
    const user = await request.formData();
    try {
        const _data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter":{
                "username": user.get('username'),
            }
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/findOne', 'post', _data);
        if(userData){
            if(userData['document']['password'] == user.get('password')){
                const token = jwt.sign(userData['document'], secretKey, { expiresIn: '1h' });
                const response = NextResponse.json(
                    {
                    data: userData['document'],
                    },
                    { status: 200 }
                );
                setCookie('token',token,{req:request,res:response});
                return response;
            }
            else{
                return NextResponse.json({error:"Wrong password"},{status:400});
            }
        }else{
            return NextResponse.json({error:"Not Found User"},{status:400});
        }
    } catch (_error) {
        return NextResponse.json({error:_error},{status:400});
    }
    
}