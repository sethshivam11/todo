import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"
import ApiError from "../utils/ApiError"
import ApiResponse from "../utils/ApiResponse"
import { User } from "../models/user.model"

const defaultAvatar = "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707049828/todoapp/kq3jhuljke1vlb4fysoh.png";

const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { fullName, email, password, avatar } = req.body

        if (
            [fullName, email, password].some((field) =>
                field?.trim() === "") ||
            !(fullName || email || password)
        ) {
            throw new ApiError(400, "All fields are required")
        }
        if (!(email.includes("@") || email.includes("."))) {
            throw new ApiError(400, "Invalid email")
        }
        const userExists = await User.findOne({ email })

        if (userExists) {
            throw new ApiError(409, "User already exists")
        }

        const user = await User.create({
            fullName, email, password, avatar
        })

        user.password = ""
        const accessToken = await user.generateAccessToken()

        if (!accessToken) {
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

        if (!email || !password) {
            throw new ApiError(404, "Email or password is required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password")
        }

        user.password = ""
        const accessToken = await user.generateAccessToken()

        if (!accessToken) {
            throw new ApiError(500, "Something went wrong, while generating access token")
        }

        return res
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
            throw new ApiError(404, "Avatar file is required")
        }

        if (req.user == undefined) {
            throw new ApiError(400, "Token error")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        user.avatar = avatar
        await user.save({ validateBeforeSave: false })
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
            throw new ApiError(400, "Email or fullName and password is required")
        }

        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(400, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password")
        }

        if (!user) {
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
            throw new ApiError(
                400,
                "Both passwords are required"
            )
        }

        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(oldPassword)

        if (!isPasswordValid) {
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
            throw new ApiError(400, "Token not found")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, req.user, "User found")
            )
    }
)

const removeAvatar = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }
        const { _id } = req.user;

        const user = await User.findById(_id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.avatar === defaultAvatar) {
            throw new ApiError(409, "Avatar already removed");
        }

        user.avatar = defaultAvatar
        user.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { avatar: defaultAvatar }, "Avatar removed")
        );
    })


export {
    registerUser,
    loginUser,
    updateAvatar,
    updateDetails,
    updatePassword,
    getCurrentUser,
    removeAvatar
}
