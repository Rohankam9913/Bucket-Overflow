import { Schema, model, models } from "mongoose";

const tagSchema = new Schema({
    tagName: {
        type: String,
        required: [true, "Provide the tag name"]
    },

    tagDescription: {
        type: String,
        required: [true, "Provide the tag description"]
    },

    tagCategory: {
        type: String,
        required: [true, "Provide the tag category"]
    },

    tagQuestionCount: {
        type: Number,
        default: 0
    }
});

export default models.Tag || model("Tag", tagSchema);
