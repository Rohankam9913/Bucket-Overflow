import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be 6 characters long"]
    },

    questions: {
        type: Number,
        default: 0
    },

    answer: {
        type: Number,
        default: 0
    },

    skills: {
        language: [],
        framework: [],
        tools: []
    }

}, { timestamps: true });

export default models.User || model("User", userSchema);

