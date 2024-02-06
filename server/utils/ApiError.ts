interface ApiError {
    statusCode: number;
    message: string;
    errors: string[];
    data: null;
    success: boolean;
    stack?: string;
}

class ApiError extends Error {
    constructor(
        statusCode: number,
        message: string = "Something went wrong!",
        errors: string[] = [],
        stack = "",
    ) {
        super()
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.data = null
        this.errors = errors
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError