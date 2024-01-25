import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface UserInterface extends Document {
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    isPasswordCorrect(password: String): Boolean,
    generateAccessToken(): String
}

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = async function () {
    return await jwt.sign({
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
    },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model<UserInterface>("user", userSchema)
