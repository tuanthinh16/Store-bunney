import { NextResponse } from "next/server";
import { fetchData } from "../../apiService";

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const idsp = searchParams.get('idsp');
    try {
        const _data = {
            "collection": "imageURL",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter":{
                "idsp": idsp,
            }
        };
        
        const userData = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/find', 'post', _data);
        return NextResponse.json({data:userData['documents']},{status:200});
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}