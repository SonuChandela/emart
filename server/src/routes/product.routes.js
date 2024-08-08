import { Router } from "express";
import { addProduct, deleteMultipleProducts, deleteProductById, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

    router.route('/add').post(
        upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
        addProduct
    );

    router.route('/update/:id').put(
        upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
        updateProduct
    );

    router.route('/delete/:id').delete(deleteProductById);
    
    router.route('/delete').delete(deleteMultipleProducts);

export default router;