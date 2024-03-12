import jwt from "jsonwebtoken";
export const authMiddleware = (req,res, next)=>{
    const header = req.headers.authorization

    if (!header) { 
        return res.status(403).json({error: 'No token provided'
    })} 

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        req.userId = decoded._id
        next()
    } catch (error) {
        console.log(error.message);
    }

}