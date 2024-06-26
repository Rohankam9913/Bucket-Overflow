import { Schema, models, model } from "mongoose";

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },

    answerBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    upvote: {
        type: Number,
        default: 0
    },

    downvote: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

export default models.Answer || model("Answer",answerSchema);