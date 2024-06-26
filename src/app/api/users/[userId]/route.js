import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDb } from "@/db/connectDb";

connectDb();

export async function GET(req, { params }){
    try{
        const { userId } = params;
        const UserDetails = await User.findById({_id: userId}).select("-password");
        if(!UserDetails){
            return NextResponse.json({ error: "No User Found" });
        }

        return NextResponse.json(UserDetails);
    }
    catch(error){
        return NextResponse.json({ error: error.message });
    }
}