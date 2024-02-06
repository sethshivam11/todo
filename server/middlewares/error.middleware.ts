import ApiError from "../utils/ApiError"
import { Request, Response, NextFunction } from "express"
import { Error } from "mongoose"

interface ApiErrorInterface {
    statusCode: number;
    message: string;
    errors: string[];
    data: null;
    success: boolean;
    stack?: string
}

const errorHandler = (error: ApiErrorInterface, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || Error ? 400 : 500
        const message = error.message || "Something went wrong!"

        error = new ApiError(statusCode, message, error?.errors, error?.stack)
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    }

    return res
        .status(error.statusCode)
        .json(response)
}

export default errorHandler