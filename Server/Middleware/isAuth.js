import jwt from "jsonwebtoken"

export const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(400).json({message:"user does not have token"})
        }

        const verifyToken = jwt.verify(token ,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user does not have  valid token"})
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {
            console.log(error)
         return res.status(500).json({message:`isAuth error ${error}`})
    }
}