import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"
import ApiError from "../utils/ApiError"
import ApiResponse from "../utils/ApiResponse"
import { User } from "../models/user.model"
import { UserRequest } from "../middlewares/auth.middleware"

const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { fullName, email, password, avatar } = req.body

        if ([email, password].some(field => field?.trim() === "")) {
            throw new ApiError(400, "Email or password is required!")
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            throw new ApiError(400, "User already exists")
        }

        const user = await User.create({
            fullName, email, password, avatar
        })

        return res
            .status(201)
            .json(
                new ApiResponse(200, user, "User created successfully")
            )
    }
)

const loginUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (!(email || password)) {
            throw new ApiError(404, "Email or password is required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Unauthorized request")
        }

        const accessToken = await user.generateAccessToken()

        if (!accessToken) {
            throw new ApiError(500, "Something went wrong, while generating access token")
        }

        res
            .status(201)
            .json(
                new ApiResponse(200,
                    { user, accessToken },
                    "User logged in successfully"
                )
            )
    }
)

const updateAvatar = asyncHandler(
    async (req: UserRequest, res: Response) => {
        const { avatar } = req.body

        if (!avatar) {
            throw new ApiError(404, "Avatar file is required")
        }

        const { _id } = req.user


        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        user.save({ validateBeforeSave: false })

        return res
            .status(202)
            .json(
                new ApiResponse(200,
                    user,
                    "Avatar updated successfully"
                )
            )
    }
)

const updateDetails = asyncHandler(
    async (req: UserRequest, res: Response) => {
        const { email, fullName } = req.body

        if (!(email || fullName)) {
            throw new ApiError(400, "Email or fullName is required")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        await user.save({ validateBeforeSave: false })

        return res
            .status(203)
            .json(
                new ApiResponse(200,
                    user,
                    "Details updated successfully"
                )
            )
    }
)

const updatePassword = asyncHandler(
    async (req: UserRequest, res: Response) => {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            throw new ApiError(
                400,
                "Both passwords are required"
            )
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = user.isPasswordCorrect(oldPassword)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid Password")
        }

        await user.save()

        return res
            .status(204)
            .json(
                new ApiResponse(200, user, "Password updated successfully")
            )
    }
)

const getCurrentUser = asyncHandler(
    async (req: UserRequest, res: Response) => {
        return res
            .status(205)
            .json(
                new ApiResponse(200, req.user, "User found")
            )
    }
)

export {
    registerUser,
    loginUser,
    updateAvatar,
    updateDetails,
    updatePassword,
    getCurrentUser
}