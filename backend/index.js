import dotenv from "dotenv";
dotenv.config()
import express from 'express'
import { connectToDB } from './db/dbConfig.js'
import userRouter from "./routes/user.routes.js";
import accountRouter from "./routes/account.routes.js";
import cors from "cors";



const app = express()
const port = 3000


app.use(cors())
app.use(express.json())

connectToDB()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/user" ,  userRouter);
app.use("/api/v1/account" ,  accountRouter);

app.use((err, req, res, next)=>{
    console.log("something wrong went outside of the routes");
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})