import mongoose from "mongoose";

export async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(error){
        console.log("Error while connecting to database",error.message);
    }
}
