import express from "express";


const router = express.Router()

router.get("/balance" , getBalance)
router.post("/transfer" , transferMoney)


export default router