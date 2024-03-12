import { User } from "../models/user.models.js"

import jwt from "jsonwebtoken";
import { userSchema } from "../typesSchema.js";
import Account from "../models/bank.models.js";



export const signup = async(req,res)=>{
    const {username , firstName , lastName , password} = req.body
    if(!username || !firstName || !lastName || !password){
        return res.status(404).json({
            success:false,
            message:"All input fields are necessary"
        })
    }

    const parsedData = userSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(404).json({
            success:false,
            message:"please enter valid  type of data"
        })
    }

    const user = new User({
         username,
         lastName ,
         firstName,
         password
    })

    const savedUser = await User.create(user)

    const userId = savedUser._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })


    const payload ={
        _id:savedUser._id,
        username:savedUser.username,
    } 

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.status(200).json({
        success:true,
        token,
    })
    
}
export const signin = async(req,res)=>{
    
    const {username , password} = req.body

    if(!username  || !password ){
        return res.status(411).json({
            success:false,
            message:"All input fields are necessary",
        })
    }

    const user = await User.findOne({username})

    console.log("user"+user);

    if( !user ) {
        return res.status(411).json({
            success:false,
            message:"User doesnt exist please login",
        })
    }

    if(user.password !== password){
        return res.status(411).json({
            success:false,
            message:"password doesnt matches",
        })
    }

    const payload ={
        _id:user._id,
        username:user.username,
    } 

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return res.status(200).json({
        success:true,
      token
    })
    

}
export const updateInfo = async(req,res)=>{
    try {
            
        const {firstName , lastName , password} = req.body
        if(!(firstName || lastName || password)){
            return res.status(411).json({
                success:false,
                message:"at least one of the user is mandatory"
            })
        }

        const id = req.params.id
        if(!id){
            return res.status(411).json({
                success:false,
                message:"please provide the user id"
            })
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(411).json({
                success:false,
                message:"user doesnt exists"
            })
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (password) user.password = password;

        await user.save();
        return res.status(200).json({
            success:true,
            message:"updated successfully"
        })
    } catch (error) {
        return res.status(411).json({
            success:false,
            message: "Error while updating information"
        })
    }
}

export const getAllUsers = async(req,res)=>{

    const { firstName, lastName } = req.query;
  try {
    // Construct the filter object based on the provided query parameters
    const filter = {};
    if (firstName) filter.firstName = new RegExp(firstName, 'i'); // Case-insensitive match
    if (lastName) filter.lastName = new RegExp(lastName, 'i'); // Case-insensitive match

    console.log(filter);

    // Retrieve users based on the filter
    const users = await User.find(filter);

    

    res.status(200).json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}