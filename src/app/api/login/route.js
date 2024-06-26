import { connectDb } from "@/db/connectDb.js";
import { checkCredentials, generateToken } from "@/utils/auth.utils";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDb();

export async function POST(req){
    try{    
        const { email, password } = await req.json();
        let user = await checkCredentials(email, password);
        if(!user){
            return NextResponse.json({error: "Invalid Credentials"});
        }
      
        const token = await generateToken(user.id, user.username);
        cookies().set("access_token", token,{
            path: "/",
            maxAge: 30000,
            httpOnly: true
        });
        
        return NextResponse.json(user);
    }
    catch(error){
        return NextResponse.json({error: error.message});
    }
}

export async function DELETE(){
    try{
        cookies().delete("access_token");
        return NextResponse.json({success: true});
    }
    catch(error){
        return NextResponse.json({error: error.message});
    }
}