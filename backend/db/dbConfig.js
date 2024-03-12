import mongoose from "mongoose";

export const connectToDB = async ()=>{
   try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log("Db is connected On"+ connection.connection.host);
   } catch (error) {
        console.log(error.message);
   }
}