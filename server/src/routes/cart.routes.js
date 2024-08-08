import { Router } from "express";
import { addItemToCart, removeItemFromCart, updateCartQuantity } from "../controllers/cart.controller.js";

const router = Router();

router.route("/add").post(addItemToCart);
router.route("/update").put(updateCartQuantity);
router.route("/remove").put(removeItemFromCart);

export default router