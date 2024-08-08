import Router from "express";
import { getOrderDetails, registerOrder } from "../controllers/order.controller.js";

const router = Router();

router.route("/register").post(registerOrder);
router.route("/get").get(getOrderDetails);

export default router;