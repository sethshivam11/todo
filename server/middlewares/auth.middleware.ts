import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError"
import asyncHandler from "../utils/asyncHandler"
import { User } from "../models/user.model"
import { ObjectId } from "mongoose"

interface JwtPayload {
    _id: string,
}

export interface UserRequest extends Request {
    user: {
        _id: string,
    }
}


const verifyJWT = asyncHandler(
    async (req: UserRequest, _: Response, next: NextFunction) => {
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
    })