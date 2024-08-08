import { Router } from "express";
import { createVariationType, deleteVariationById, getVariationTypes, updateVariationType } from "../controllers/variationType.controller.js";

const router = Router();

router.route("/create").post(createVariationType);
router.route("/types").get(getVariationTypes);
router.route("/update/:id").put(updateVariationType);
router.route("/delete/:id").delete(deleteVariationById);
// router.route("/register").post(upload.single('avatar'), userRegister);

export default router