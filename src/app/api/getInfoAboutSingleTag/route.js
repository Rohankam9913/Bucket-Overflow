import { NextResponse } from "next/server"; 
import Tag from "@/models/tagModel";
import { connectDb } from "@/db/connectDb";

connectDb();
export async function GET(req){
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('tag');
    
    try{
        const tagInfo = await Tag.findById({_id: query});
        return NextResponse.json(tagInfo);
    }
    catch(error){
        return NextResponse.json({error: error.message});
    }
}