import mongoose, { Schema, Document } from "mongoose"

interface TodoInterface extends Document {
    completed: Boolean,
    content: String,
    title: String,
    tag: String,
    user: String
}

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

export const Todo = mongoose.model<TodoInterface>("todo", todoSchema)