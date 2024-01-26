import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express"
import { Todo } from "../models/todo.model";

const getAllTodos = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        const todos = await Todo.find({ user: _id })

        return res
            .status(200)
            .json(
                new ApiResponse(200, todos, "Todos found")
            )
    }
)

const createTodo = asyncHandler(
    async (req: Request, res: Response) => {
        const { title, tag, content } = req.body

        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { _id } = req.user

        if (!title || !content) {
            throw new ApiError(400, "Title and content are required")
        }

        const todo = await Todo.create({
            title,
            tag,
            content,
            user: _id
        })

        if (!todo) {
            throw new ApiError(500, "Something went wrong, while creating todo")
        }

        return res
            .status(201)
            .json(
                new ApiResponse(200, todo, "Todo created successfully")
            )
    }
)

const updateTodo = asyncHandler(
    async (req: Request, res: Response) => {

        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { content, title, completed, tag } = req.body
        const { todo_id } = req.params
        const { _id } = req.user

        if (!(content || title || completed || tag) || !todo_id) {
            throw new ApiError(400, "todo_id / content / title / completed / tag is required")
        }

        const todo = await Todo.findById(todo_id)

        if (!todo) {
            throw new ApiError(404, "Todo not found")
        }

        if (todo.user.toString() !== _id.toString()) {
            throw new ApiError(401, "Unathorized request")
        }

        if (content) todo.content = content
        if (title) todo.title = content
        if (completed) todo.completed = completed
        if (tag) todo.tag = tag

        await todo.save()

        return res
            .status(202)
            .json(
                new ApiResponse(200, todo, "Todo updated successfully")
            )
    }
)

const deleteTodo = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.user == undefined) {
            throw new ApiError(400, "Token not found")
        }

        const { todo_id } = req.params
        const { _id } = req.user

        if (!todo_id) {
            throw new ApiError(400, "todo_id is required")
        }

        const todo = await Todo.findById(todo_id)

        if (!todo) throw new ApiError(404, "Todo not found`")
        if (todo.user !== _id) throw new ApiError(400, "Unathorized request")
        

        await Todo.findByIdAndDelete(todo_id)

        return res
            .status(203)
            .json(
                new ApiResponse(200, {}, "Todo deleted successfully")
            )
    }
)

export {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}