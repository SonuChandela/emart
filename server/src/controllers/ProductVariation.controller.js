import { Product } from "../models/product.model.js";
import { VariationValue } from "../models/variationValue.model.js";
import { ProductVariation } from "../models/productVariation.model.js";
import { VariationType } from "../models/variationType.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateSlug } from "../utils/GenrateUrlSlug.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadGalleryImg } from "../utils/uploadGalleryImages.js";
import fs from 'fs';
import generateImgNewPath from "../utils/GenerateImgNewPath.js";
import mongoose from "mongoose";

// move and rename file
const moveAndRenameFile = async (file, name) => {
    const newPath = await generateImgNewPath(file, name);
    fs.renameSync(file.path, newPath);
    return newPath;
};

// process Existing Images 
const processExistingImages = async (image, id, dbImages, name) => {
    let images = [];
    let matchIds = [];

    const imageId = new mongoose.Types.ObjectId(id);

    const matchedImage = dbImages.find(img => img._id.equals(imageId));
    if (matchedImage) {
        const newPath = await moveAndRenameFile(image, name);
        images = newPath;
        matchIds = matchedImage._id;
    }

    return { images, matchIds };
};


// process new Images
const processNewImages = async (image, name) => {
    let images = [];
    const newPath = await moveAndRenameFile(image, name);
    images = newPath;
    return images;
};

// create new product variation 
const createProductVariation = asyncHandler(async (req, res) => {

    const { productId, variationType, variationValue, price, stock } = req.body;

    if (!productId || !variationType || !variationValue || !price || !stock) {
        throw new ApiError(400, 'productId, variationType, variationValue , price and stock are required fields.');
    }

    const product = await Product.findById(productId);

    const variationTypeName = await VariationType.findById(variationType).select('name');

    if (!product || !variationTypeName) {
        return res.status(400).json({ message: 'Invalid product or variation type' });
    }

    const variationValueName = await VariationValue.findById(variationValue).select('value');

    if (!variationValueName) {
        throw new ApiError('Invalid variation value');
    }

    const name = `${product.name} ${variationTypeName.name} ${variationValueName.value}`;

    const urlSlug = generateSlug(name);

    const images = [];
    if (req.files?.images) {
        for (const image of req.files.images) {
            images.push(await moveAndRenameFile(image, name));
        }
        images = await uploadGalleryImg(images, process.env.VRIATIONS_IMG_FOLDER);
    }

    const variationOptions = [
        {
            variationValue,
            name,
            urlSlug,
            price,
            stock,
            images
        }
    ];

    const newVariation = new ProductVariation({
        productId,
        variationType,
        options: variationOptions,
    });

    await newVariation.save();

    return res.status(201).json(
        new ApiResponse(200, newVariation, 'Product variation sucessfully created.')
    );
});

// get product varitions list 
const getProductVariations = asyncHandler(async (req, res) => {

    const productVariations = await ProductVariation.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product',
                pipeline: [
                    { $project: { name: 1, urlSlug: 1, status: 1, images: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'variationtypes',
                localField: 'variationType',
                foreignField: '_id',
                as: 'variationType',
                pipeline: [
                    { $project: { name: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$variationType',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$options',
            }
        },
        {
            $lookup: {
                from: 'variationvalues',
                localField: 'options.variationValue',
                foreignField: '_id',
                as: 'options.variationValue',
                pipeline: [
                    { $project: { value: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$options.variationValue',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                product: { $first: '$product' },
                variationType: { $first: '$variationType' },
                options: { $push: '$options' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' }
            }
        }
    ])


    return res.status(200).json(
        new ApiResponse(200, productVariations, 'Product variation fetch sucessfully.')
    );
});



// get variation by id 
const getProductVariationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const idObjectId = new mongoose.Types.ObjectId(id);

    const variationById = await ProductVariation.aggregate([
        {
            $match: {
                _id: idObjectId
            }
        },
        {
            $lookup: {
                from: 'variationtypes',
                localField: 'variationType',
                foreignField: '_id',
                as: 'variationType',
                pipeline: [
                    { $project: { name: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$variationType',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$options',
            }
        },
        {
            $lookup: {
                from: 'variationvalues',
                localField: 'options.variationValue',
                foreignField: '_id',
                as: 'options.variationValue',
                pipeline: [
                    { $project: { value: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$options.variationValue',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                productId: { $first: '$productId' },
                variationType: { $first: '$variationType' },
                options: { $push: '$options' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' }
            }
        }
    ]);

    if (!variationById) {
        throw new ApiError(500, 'Uable to fetch Product variation By Id. Try again later.')
    }

    return res.status(200).json(
        new ApiResponse(200, variationById, `Data sucessfully fetch of variation Id :- ${id}.`)
    );
})


// update product variation 
const updateProductVariation = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const updateFields = { ...req.body };
    const { productId, variationType, ...optionFields } = updateFields;

    if (!productId || !productId || !optionFields.variationValue) {
        throw new ApiError(400, "Product ID , variation Type and Value are required Fields.")
    }

    const productVariation = await ProductVariation.findById(id);
    if (!productVariation) {
        throw new ApiError(404, "Invalid product variation ID.");
    }

    const dbexistingOptions = productVariation.options;
    const dbExistingImages = productVariation.options[0].images;

    if (!optionFields.name) {
        const productName = await Product.findById(productId);
        const variationName = await VariationType.findById(variationType);
        const variationValue = await VariationValue.findById(optionFields.variationValue);
        optionFields.name = `${productName.name} ${variationName.name} ${variationValue.value}`;
    }

    if (optionFields?.name || optionFields?.urlSlug) {
        optionFields.urlSlug = generateSlug(optionFields.name || optionFields.urlSlug);
    }

    const ids = optionFields.imagesId?.split(',');
    let cloudUploadedImages = null;

    if (req.files?.images) {
        let images = [];
        let matchIds = [];

        for (const [index, requestedImage] of req.files?.images.entries()) {
            if (ids[index]) {
                const { images: processedImages, matchIds: processedMatchIds } =
                    await processExistingImages(requestedImage, ids[index], dbExistingImages, optionFields.name);
                images.push(processedImages);
                matchIds.push(processedMatchIds);
            } else {
                images.push(await processNewImages(requestedImage, optionFields.name));
            }
        }
        cloudUploadedImages = await uploadGalleryImg(images, process.env.VRIATIONS_IMG_FOLDER, matchIds);
    }

    const lastOption = dbexistingOptions[0]._doc;

    const imageMap = new Map(lastOption.images.map(img => [img._id.toString(), img]));

    // merged images of lastOption map and newImage 
    cloudUploadedImages.forEach(newImage => {

        const imageId = newImage?._id?.toString() || new mongoose.Types.ObjectId().toString();
        (newImage?._id) ? imageMap.set(imageId, { ...newImage, _id: imageId }) : imageMap.set(imageId, { ...newImage });

    });

    const mergedImages = Array.from(imageMap.values());

    // delete image from old data 
    delete lastOption.images;
    // insert mergedImages into optionfields images 
    optionFields.images = mergedImages;

    dbexistingOptions[0] = {
        ...lastOption,
        ...optionFields,
    };

    const updatedFields = {
        productId,
        variationType,
        options: dbexistingOptions
    }

    const updatedProductVariation = await ProductVariation.findByIdAndUpdate(id, updatedFields, { new: true });

    return res.status(200).json(
        new ApiResponse(200, updatedProductVariation, 'Product variation data updated sucessfully.')
    );
});


// delete product variations

const deleteProductVariation = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const productVariation = await ProductVariation.findByIdAndDelete(id);

    if (!productVariation) {
        throw new ApiError(400, 'ProductVariation not found');
    }

    return res.status(200).json(
        new ApiResponse(200, productVariation, 'Product variation delete sucessfully.')
    );
});

export {
    createProductVariation,
    getProductVariations,
    getProductVariationById,
    updateProductVariation,
    deleteProductVariation
}