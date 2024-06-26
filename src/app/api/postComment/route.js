import { NextResponse } from "next/server";
import Question from "@/models/questionModel";
import Answer from "@/models/answerModel";
import Comment from "@/models/commentModel";
import User from "@/models/userModel";
import { connectDb } from "@/db/connectDb";

connectDb();

export async function POST(req) {
    try {
        const { id, type, commentBy, content } = await req.json();

        let createComment = await Comment.create({ commentBy, content });

        if (type === "question") {
            let questionComment = await Question.findByIdAndUpdate({ _id: id }, { $push: { comment: createComment._id } }, { new: true });
            questionComment = await Comment.find({_id: createComment._id}).populate("commentBy","_id username");
            
            return NextResponse.json(questionComment);
        }
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
