import { Router } from "express";
import { createVariationValue, getVariationValues, updateVariationValue, deleteVariationValue } from "../controllers/variationValue.controller.js";

const router = Router();

router.route("/create").post(createVariationValue);
router.route("/values").get(getVariationValues);
router.route("/update/:id").put(updateVariationValue);
router.route("/delete/:id").delete(deleteVariationValue);

export default router