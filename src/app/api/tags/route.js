import Tag from "@/models/tagModel.js";
import { connectDb } from "@/db/connectDb";
import { NextResponse } from "next/server";

connectDb();

export async function POST(req) {
    try {
        const tagData = await req.json();
        const createdTag = await Tag.create(tagData);
        return NextResponse.json(createdTag);
    }
    catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Error happened while creating a tag" });
    }
}

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('sort'); 

        if(query === "get_minimal"){
            return NextResponse.json(await Tag.find({}).select("_id tagName"))
        }

        if(query === "all" || query === null){
            return NextResponse.json(await Tag.find({}));
        }

        const getAllTags = await Tag.find({tagCategory: query});

        return NextResponse.json(getAllTags);
    }
    catch (error) {
        return NextResponse.json({ error: "Error happened while fetching the tags" });
    }
}