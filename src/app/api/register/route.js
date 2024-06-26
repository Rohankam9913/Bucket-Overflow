import { NextResponse } from "next/server";
import User from "@/models/userModel.js";
import { connectDb } from "@/db/connectDb";
import { checkUser, hashPassword } from "@/utils/auth.utils";

connectDb();

export async function POST(req){
    try{
        const { username, email, password } = await req.json();
        
        if(! await checkUser(email)){
            const hashed = await hashPassword(password);
            let user = await User.create({username, email, password : hashed});
            user = await User.findById({_id : user._id}).select("-password");
            return NextResponse.json(user);
        }
        else{
            return NextResponse.json({error : "User Already Exists"});
        }
    }
    catch(error){
        return NextResponse.json({error : error.message});
    }
}
