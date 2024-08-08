import { Router } from "express";
import { loginUser, logoutUser, userRegister } from "../controllers/users.controller.js"
import { upload } from "../utils/uploadFiles.js"
import { verfyjwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
// router.route("/register").post(upload.single('avatar'), userRegister);

router.route("/login").post(loginUser)

router.route("/logout").post(verfyjwt, logoutUser)

export default router