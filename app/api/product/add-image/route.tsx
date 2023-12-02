import { NextRequest, NextResponse } from "next/server";
import { fetchData } from "../../apiService";

export async function POST(request:NextRequest) {
    const product = await request.formData();
    try {
        const imageUrls = [];
        for (let i = 0; i < product.getAll('file0').length; i++) {
            const fieldName = `file${i}`;
            const fileUrls = product.getAll(fieldName);
            imageUrls.push(...fileUrls);
        }
        const _data = {
            "collection": "imageURL",
            "database": "FirstApi",
            "dataSource": "RustData",
            "document": {
                'idsp':product.get('idsp'),
                'imageUrl': imageUrls
            }
        };
        console.log('value: ',product)
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