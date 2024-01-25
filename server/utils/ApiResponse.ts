interface ApiResponse {
    statusCode: number,
    data: object,
    message: string,
    success: boolean
}

class ApiResponse {
    constructor(statusCode: number, data: object, message: string) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        if (statusCode < 400) {
            this.success = true
        }
    }
}

export default ApiResponse