import express from "express";
import { getAllUsers, signin, signup, updateInfo } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router()


router.post("/signup" , signup)
router.post("/signin" , signin)
router.put("/update/:id" ,authMiddleware, updateInfo)
router.get("/bulk" , getAllUsers)


export default router