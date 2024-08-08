import { Router } from "express";
import { getUserRole, registerUserRole } from "../controllers/userRole.controller.js";

const router = Router();

router.route("/register").post(registerUserRole);
router.route("/roles").get(getUserRole);

export default router