import { NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { connectDb } from "@/db/connectDb";
import User from "@/models/userModel";
import Tag from "@/models/tagModel";

connectDb();

export async function POST(req) {
    try {
        const { title, content, askedBy, tags } = await req.json();
        let question = await Question.create({ title, content, askedBy, tags });
        question = await Question.find({ _id: question._id }).populate("askedBy", "_id username reputation").populate("tags", "_id tagName");

        await User.findByIdAndUpdate({ _id: askedBy }, { $inc: { questions: 1 } }, { new: true });

        for (let i = 0; i < tags.length; i++) {
            await Tag.findByIdAndUpdate({ _id: tags[i] }, { $inc: { tagQuestionCount: 1 } }, { new: true });

        }

        return NextResponse.json(question);
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("tag_id");

        const questions = await Question.find({ tags: { $in: { _id: query } } }).populate("tags", "_id tagName").populate("askedBy", "username _id");
        return NextResponse.json(questions);
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

// Upvote and downvote
export async function PUT(req) {
    try {
        const { questionId, val } = await req.json();
        let questionDetails;

        if (val) {
            questionDetails = await Question.findByIdAndUpdate({ _id: questionId }, { $inc: { upvote: 1 } }, { new: true });
        }
        else {
            questionDetails = await Question.findByIdAndUpdate({ _id: questionId }, { $inc: { downvote: -1 } }, { new: true });
        }

        return NextResponse.json((questionDetails.upvote + questionDetails.downvote));
    }
    catch (error) {
        return NextResponse.json({ error: error.message });
    }
}