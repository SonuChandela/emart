import { Router } from "express";
import { renewAccessToken } from "../controllers/auth.controller.js";

const router = Router();

router.route("/renew-access-token").post(renewAccessToken)

export default router