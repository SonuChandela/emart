import { Router } from "express";
import { addItemToCart, getCartByUserId, removeItemFromCart, updateCartQuantity } from "../controllers/cart.controller.js";

const router = Router();

router.route("/add").post(addItemToCart);
router.route("/update").put(updateCartQuantity);
router.route("/remove").delete(removeItemFromCart);
router.route("/get").get(getCartByUserId);

export default router