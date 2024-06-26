import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const checkPassword = async (original, hashed) => {
    return await bcrypt.hash(original, hashed);
}

export const checkCredentials = async (email, password) => {
    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return false;
        }

        if (!await checkPassword(password, user.password)) {
            return false;
        }

        return { id: user._id, username: user.username, email: user.email };
    }

    catch (error) {
        return false;
    }
}

export const checkUser = async (email)=>{
    const isUserExists = await User.findOne({email : email});
    if(isUserExists){
        return true;
    }
    
    return false;
}

export const hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

export const generateToken = async (userId, username)=>{
    let token = await jwt.sign({userId, username}, process.env.SECRET, {expiresIn: "1h"});
    return token;
}

export const verifyToken = async (token)=>{
    return await jwt.verify(tokken, process.env.SECRET);
}

