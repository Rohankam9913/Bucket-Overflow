import { Schema, model, models } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    upvote: {
        type: Number,
        default: 0
    },

    downvote: {
        type: Number,
        default: 0
    },

    askedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer",
        }
    ],

    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],

    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {timestamps: true});

export default models.Question || model("Question",questionSchema);