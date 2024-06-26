import { NextResponse } from "next/server";
import User from "@/models/userModel.js";

export async function POST(req){
    try{
        const { userId,username,skills } = await req.json();
        const UserInfo = await User.findByIdAndUpdate({_id: userId}, {skills: skills, username:username}, {new: true}).select("-password");
        return NextResponse.json(UserInfo);
    }
    catch(error){
        return NextResponse.json({error: error.message});
    }
}