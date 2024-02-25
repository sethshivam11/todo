import { Router } from "express";
import { getCurrentUser, loginUser, registerUser, updateAvatar, updateDetails, updatePassword, removeAvatar } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/updateAvatar").patch(verifyJWT, updateAvatar)

router.route("/changePassword").patch(verifyJWT, updatePassword)

router.route("/updateDetails").put(verifyJWT, updateDetails)

router.route("/get").get(verifyJWT, getCurrentUser)

router.route("/removeAvatar").get(verifyJWT, removeAvatar)

export default router
