import { Router } from "express";
import { createCategory, deleteById, getAncestors, getCategories, getChildrens, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/create").post(createCategory);
router.route("/categories").get(getCategories);
router.route("/update/:id").patch(updateCategory);
router.route("/remove/:id").delete(deleteById);
router.route("/childrens/:id").get(getChildrens);
router.route("/ancestors/:id").get(getAncestors);

export default router