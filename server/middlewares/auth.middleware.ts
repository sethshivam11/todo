import { Request, Response, NextFunction } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import ApiError from "../utils/ApiError"
import { User } from "../models/user.model"
import ApiResponse from "../utils/ApiResponse"

interface JwtPayload {
    _id: string,
}

export const verifyJWT =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "")

            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }

            const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload

            if (!decodedToken?._id) {
                throw new ApiError(400, "Invalid token")
            }
            const user = await User.findById(decodedToken._id)

            if (!user) {
                throw new ApiError(404, "User not found")
            }

            user.password = ""
            req.user = user

            next()
        } catch (err) {

            if (err instanceof TokenExpiredError) {
                throw new ApiError(401, "Token expired")
            }
            
            next(err)
        }
    }

