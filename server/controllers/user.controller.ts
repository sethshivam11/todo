import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"
import ApiError from "../utils/ApiError"
import ApiResponse from "../utils/ApiResponse"
import { User } from "../models/user.model"

const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { fullName, email, password, avatar } = req.body

        if ([fullName, email, password].some(field => field?.trim() === "")) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "All fields are required")
                )
            throw new ApiError(400, "All fields are required!")
        }
        if (!(email.includes("@") || email.includes("."))) {
            res
                .status(401)
                .json(
                    new ApiResponse(400, {}, "Invalid email")
                )
            throw new ApiError(400, "Invalid email")
        }
        const userExists = await User.findOne({ email })

        if (userExists) {
            res
                .status(409)
                .json(
                    new ApiResponse(400, {}, "User already exists")
                )
            throw new ApiError(409, "User already exists")
        }

        const user = await User.create({
            fullName, email, password, avatar
        })

        user.password = ""
        const accessToken = await user.generateAccessToken()

        if (!accessToken) {
            res
                .status(500)
                .json(
                    new ApiResponse(500, {}, "Something went wrong, while generating access token")
                )
            throw new ApiError(500, "Something went wrong, while generating access token")
        }

        return res
            .status(201)
            .json(
                new ApiResponse(200, { user, accessToken }, "User created successfully")
            )
    }
)

const loginUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (!(email || password)) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "Email or password is required")
                )
            throw new ApiError(404, "Email or password is required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "User not found")
                )
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "Invalid password")
                )
            throw new ApiError(401, "Unauthorized request")
        }

        user.password = ""
        const accessToken = await user.generateAccessToken()

        if (!accessToken) {
            res
                .status(500)
                .json(
                    new ApiResponse(500, {}, "Something went wrong, while generating access token")
                )
            throw new ApiError(500, "Something went wrong, while generating access token")
        }

        res
            .status(200)
            .json(
                new ApiResponse(200,
                    { user, accessToken },
                    "User logged in successfully"
                )
            )
    }
)

const updateAvatar = asyncHandler(
    async (req: Request, res: Response) => {

        const { avatar } = req.body

        if (!avatar) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Avatar file is required")
                )
            throw new ApiError(404, "Avatar file is required")
        }

        if (req.user == undefined) {
            res
                .status(401)
                .json(
                    new ApiResponse(400, {}, "Token error")
                )
            throw new ApiError(400, "Token error")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "")
                )
            throw new ApiError(404, "User not found")
        }

        user.save({ validateBeforeSave: false })
        user.password = ""

        return res
            .status(200)
            .json(
                new ApiResponse(200,
                    user,
                    "Avatar updated successfully"
                )
            )
    }
)

const updateDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, fullName, password } = req.body

        if (!(email || fullName) || !password) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Email or fullName and password is required")
                )
            throw new ApiError(400, "Email or fullName and password is required")
        }

        if (req.user == undefined) {
            res
                .status(401)
                .json(
                    new ApiResponse(400, {}, "Token not found")
                )
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "User not found")
                )
            throw new ApiError(400, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            res
                .status(401)
                .json(
                    new ApiResponse(400, {}, "Invalid password")
                )
            throw new ApiError(401, "Invalid password")
        }

        if (!user) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "User not found")
                )
            throw new ApiError(404, "User not found")
        }

        if (email) user.email = email
        if (fullName) user.fullName = fullName

        await user.save({ validateBeforeSave: false })
        user.password = ""

        return res
            .status(200)
            .json(
                new ApiResponse(200,
                    user,
                    "Details updated successfully"
                )
            )
    }
)

const updatePassword = asyncHandler(
    async (req: Request, res: Response) => {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Both password are required")
                )
            throw new ApiError(
                400,
                "Both passwords are required"
            )
        }

        if (req.user == undefined) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Token not found")
                )
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            res
                .status(404)
                .json(
                    new ApiResponse(400, {}, "User not found")
                )
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(oldPassword)

        if (!isPasswordValid) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Invalid password")
                )
            throw new ApiError(401, "Invalid password")
        }

        user.password = newPassword
        await user.save()
        user.password = ""

        return res
            .status(200)
            .json(
                new ApiResponse(200, user, "Password updated successfully")
            )
    }
)

const getCurrentUser = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.user == undefined) {
            res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "Token not found")
                )
            throw new ApiError(400, "Token not found")
        }

        return res
            .status(200)
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