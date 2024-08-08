import { Router } from "express";
import { createProductVariation, deleteProductVariation, getProductVariations, updateProductVariation } from "../controllers/ProductVariation.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/create").post(upload.fields([{ name: 'images', maxCount: 4 }]),createProductVariation);
router.route("/get").get(getProductVariations);
router.route("/update/:id").put(upload.fields([{ name: 'images', maxCount: 4 }]),updateProductVariation);
router.route("/delete/:id").delete(deleteProductVariation);

export default router;