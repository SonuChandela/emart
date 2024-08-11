import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateSlug } from "../utils/GenrateUrlSlug.js";
import { uploadGalleryImg } from "../utils/uploadGalleryImages.js";
import { uploadThumbnail } from "../utils/uploadThumbnail.js";
import fs from 'fs';
import generateImgNewPath from "../utils/GenerateImgNewPath.js";


const addProduct = asyncHandler(async (req, res) => {
    const { userId, categoryId, name, description, urlSlug, status,stock,price,salePrice } = req.body;

    if (!userId || !categoryId || !name) {
        throw new ApiError(400, 'UserId, CategoryId, and Name are required fields.');
    }

    const duplicateName = await Product.findOne({ name });
    if (duplicateName) {
        throw new ApiError(404, "Product already exists. Please use a unique name.");
    }

    let slug = generateSlug(name || urlSlug);
    let slugExist = await Product.findOne({ urlSlug: slug, categoryId });
    let i = 1;
    while (slugExist) {
        slug = `${slug}-${i}`;
        slugExist = await Product.findOne({ urlSlug: slug, categoryId });
        i++;
    }

    let images = [];
    if (req.files?.images) {
        for (const image of req.files.images) {
            const newPath = generateImgNewPath(image, name);
            fs.renameSync(image.path, newPath);
            images.push(newPath);
        }
        images = await uploadGalleryImg(images,process.env.PRODUCTS_IMG_FOLDER);
    }

    let thumbnail = null;
    if(req.files?.thumbnail?.[0]){
        const thumbnailImg = req.files?.thumbnail?.[0];
        const newPath = generateImgNewPath(thumbnailImg,name);
            fs.renameSync(thumbnailImg.path,newPath);
            thumbnail = await uploadThumbnail(newPath,process.env.PRODUCTS_IMG_FOLDER);
            images.unshift(thumbnail);
    }

    const product = new Product({
        userId,
        categoryId,
        name: name.toLowerCase(),
        description,
        urlSlug: slug.toLowerCase(),
        status,
        images,
        price,
        stock,
        salePrice
    });

    await product.save();

    res.status(201).json({ success: true, product });
});


const updateProduct = asyncHandler(async (req, res) => {

    // const { categoryId, name, description, urlSlug, status } = req.body;

    const { id } = req.params;

    const updatedFields = { ...req.body };

    if (!id) {
        throw new ApiError(400, 'Id is a required field.');
    }

    const productExist = await Product.findById(id);

    if (!productExist) {
        throw new ApiError(400, 'Product ID not found. Verify Product ID.');
    }

    if(req.body.name || req.body.urlSlug){
      updatedFields.urlSlug = generateSlug(req.body.name || req.body.urlSlug);
    }

    const productName = (req.body.name) ? req.body.name : productExist.name;

   // Handle images upload if present
   let images = [];
   if (req.files?.images) {
       for (const image of req.files.images) {
           const newPath = generateImgNewPath(image, productName);
           fs.renameSync(image.path, newPath);
           images.push(newPath);
       }
       images = await uploadGalleryImg(images,process.env.PRODUCTS_IMG_FOLDER);
   }

//   let images = req.files?.images ? await uploadGalleryImg(req.files.images) : [];

  // Handle thumbnail upload and push it into images array

  let thumbnail = null;
    if(req.files?.thumbnail?.[0]){
        const thumbnailImg = req.files?.thumbnail?.[0];
        const newPath = generateImgNewPath(thumbnailImg,productName);
            fs.renameSync(thumbnailImg.path,newPath);
            thumbnail = await uploadThumbnail(newPath,process.env.PRODUCTS_IMG_FOLDER);
            images.unshift(thumbnail);
    }
//   if (req.files?.thumbnail?.[0]) {
//     const thumbnail = await uploadThumbnail(req.files.thumbnail[0]);
//     if (thumbnail) {
//       images.unshift(thumbnail);
//     }
//   }

  if (images.length > 0) {
    updatedFields.images = images;
  }

  delete updatedFields.thumbnail;
    
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true })

    if (!updatedProduct) {
        throw new ApiError(500, 'Something Wrong unable to update product.')
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, 'Product Update Sucessfully.')
    )
});

const deleteProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Id is a required field.');
    }

    const productExist = await Product.findById(id);

    if (!productExist) {
        throw new ApiError(400, 'Product ID not found. Verify Product ID.');
    }

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
        throw new ApiError(500, 'Something wrong unable to delete product.');
    }

    return res.status(201).json(
        new ApiResponse(200, `Product Id:-${id} Deleted Sucessfully`)
    )
})

const deleteMultipleProducts = asyncHandler(async (req, res) => {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        throw new ApiError(400, 'productIds is required and should be a non-empty array.');
    }

    const result = await Product.deleteMany({ _id: { $in: productIds } });


    if (result.deletedCount === 0) {
        throw new ApiError(404, 'No products found with the provided IDs.');
    }

    return res.status(200).json(
        new ApiResponse(200, result, `${result.deletedCount} products deleted successfully.`)
    );
})
export {
    addProduct,
    updateProduct,
    deleteProductById,
    deleteMultipleProducts,
    
}