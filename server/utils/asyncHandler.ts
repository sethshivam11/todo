import { Request, Response, NextFunction } from "express"

const asyncHandler = (requestHandler: Function) => {
    return (req: Request, res: Response, next: NextFunction) => (
        Promise.resolve(requestHandler(req, res))
            .catch((err) => next(err))
    )
}
export default asyncHandler