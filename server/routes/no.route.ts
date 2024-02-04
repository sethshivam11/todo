import { Router, Request, Response } from "express"
import ApiResponse from "../utils/ApiResponse"


const noRoute = (req: Request, res: Response) => {
    res.json(
        new ApiResponse(200, {}, "No routes found")
    )
}
const router = Router()

router.route("/*").get(noRoute).post(noRoute).put(noRoute).patch(noRoute)

export default router