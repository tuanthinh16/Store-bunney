import { NextRequest, NextResponse } from "next/server";
import { fetchData } from "../../apiService";



export async function GET(request:NextRequest) {
    const {searchParams} = new URL(request.url)
    const _name = searchParams.get('categoryName')
    try {
        const _data = {
            "collection": "Products",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter":{
                "category":_name
            }
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/find', 'post', _data);
        return NextResponse.json({data:userData['documents']},{status:200});
    } catch (error) {
        console.error('Error fetching Categories data:', error);
        throw error;
    }
}