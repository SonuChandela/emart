import Router from "express";
import { getOrderDetailsById, registerOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = Router();

router.route("/register").post(registerOrder);
router.route("/get/:id").get(getOrderDetailsById);
router.route("/status/:id").put(updateOrderStatus);

export default router;