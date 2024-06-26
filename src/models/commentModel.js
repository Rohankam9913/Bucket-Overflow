import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default models.Comment || model("Comment", commentSchema);