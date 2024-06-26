import { connectDb } from "@/db/connectDb";
import User from "@/models/userModel.js";
import { NextResponse } from "next/server";

connectDb();

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('sort');

        let userDetails;
        
        if(query === "reputation"){
            userDetails = await User.find({}).sort({reputation: -1}).select("-password");
        }
        else if(query === "new"){
            userDetails = await User.find({}).sort({createdAt: -1}).select("-password");
        }
        else if(query === "old"){
            userDetails = await User.find({}).sort({createdAt: "asc"}).select("-password");
        }

        if (userDetails.length === 0) {
            return NextResponse.json({ error: "No users found" });
        }

        return NextResponse.json(userDetails);
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}