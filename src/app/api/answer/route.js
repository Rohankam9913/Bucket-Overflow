import { NextResponse } from "next/server";
import { connectDb } from "@/db/connectDb";
import User from "@/models/userModel.js";
import Answer from "@/models/answerModel.js";
import Question from "@/models/questionModel.js";
import Comment from "@/models/commentModel.js";
import Tags from "@/models/tagModel.js";

connectDb();

export async function POST(req) {
    try {
        const { questionId, content, answerBy } = await req.json();
        let answerDetails = await Answer.create({ content, answerBy });
        let questionDetails = await Question.findByIdAndUpdate({ _id: questionId }, { $push: { answers: answerDetails._id } }, { new: true });
        await User.findByIdAndUpdate({ _id: answerBy }, { $inc: { answer: 1 } }, { new: true });

        return NextResponse.json(questionDetails);
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("question_id");
        const limit = Number(searchParams.get("limit"));

        let get_details = await Question.find({ _id: query }).populate("answers").populate("askedBy", "_id username createdAt").populate("tags", "tagName").populate("comment").slice("comment",limit);

        for (let i = 0; i < get_details.length; i++) {
            for (let j = 0; j < get_details[i].answers.length; j++) {
                get_details = await User.populate(get_details, {
                    path: `answers[${j}].answerBy`,
                    select: "username _id createdAt"
                });
            }

            for(let j = 0;j < get_details[i].comment.length;j++){
                get_details = await User.populate(get_details,{
                    path: `comment[${j}].commentBy`,
                    select: "username _d createdAt"
                })
            }
        }

        return NextResponse.json(get_details);
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function PUT(req) {
    try {
        const { answerId, val } = await req.json();
        let answerDetails;
        if (val) {
            answerDetails = await Answer.findByIdAndUpdate({ _id: answerId }, { $inc: { upvote: 1 } }, { new: true });
        }
        else {
            answerDetails = await Answer.findByIdAndUpdate({ _id: answerId }, { $inc: { downvote: -1 } }, { new: true });
        }

        return NextResponse.json((answerDetails.upvote + answerDetails.downvote));
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}