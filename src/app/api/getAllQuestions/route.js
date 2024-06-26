import { NextResponse } from "next/server";
import Question from "@/models/questionModel";
import User from "@/models/userModel";
import Tag from "@/models/tagModel";
import { connectDb } from "@/db/connectDb";

connectDb();

export async function GET(){
    try{    
        let questions = await Question.find({}).populate("askedBy","-password").populate("tags","_id tagName");

        if(questions.length === 0){
            return NextResponse.json({error: "No questions"});
        }

        return NextResponse.json(questions);
    }
    catch(error){
        return NextResponse.json({error: error.message});
    }
}