import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        unique:[true , "username has been taken"]
    },
    firstName:String,
    lastName:String,
    password:String
})

export  const User = mongoose.model("User",userSchema)