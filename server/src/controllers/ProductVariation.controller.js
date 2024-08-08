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



// create new product variation 


const createProductVariation = asyncHandler(async (req, res) => {

    const { productId, variationType, variationValue, price, stock } = req.body;

    if (!productId || !variationType || !variationValue || !price || !stock ) {
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
            const newPath = await generateImgNewPath(image,name);
            fs.renameSync(image.path, newPath);
            images.push(newPath);
        }
        images = await uploadGalleryImg(images,process.env.VRIATIONS_IMG_FOLDER);
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

//     const variationOptions = await Promise.all(options.map(async option => {
//         const variationValueName = await VariationValue.findById(variationValue).select('value');

//         if (!variationValueName) {
//             throw new Error('Invalid variation value');
//         }

//         const images = req.files?.images
//         ? await uploadGalleryImg(req.files?.images)
//         : []; 

// const name = `${product.name} ${variationTypeName.name} ${variationValueName.value}`;
// const urlSlug = generateSlug(name);

// return {
//             ...option,
//             name,
//             urlSlug,
//             images
//         };
//     }));

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
    const productVariations = await ProductVariation.find()
        .populate('productId')
        .populate('variationType')
        .populate('options.variationValue');

    return res.status(200).json(
        new ApiResponse(200, productVariations, 'Product variation fetch sucessfully.')
    );
});

// test update method

const updateProductVariation = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // const updateFileds = {...req.body};
    const {productId, variationType, variationValue, name, urlSlug, stock , price, salesPrice, status } = {...req.body};

    const optionFields = {
        variationValue,name, urlSlug
    }

    if( !productId || !productId ||  !variationValue ){
        throw new  ApiError(400,"Product ID , variation Type and Value are required Fields.")
    }

    const productVariation = await ProductVariation.findById(id);
    
    if(!productVariation){
        throw new ApiError(404,"Please use a valid product vartiation Id.")
    }

    if(!optionFields.name){
        const productName = await Product.findById(productId).select('name');
        const variationName = await VariationType.findById(variationType).select('name');
        const variationValue = await VariationValue.findById(variationValue).select('value');
        optionFields.name = `${productName} ${variationName} ${variationValue}`;
    }
    
    // const {productId, variationType, ...optionFields} = updateFileds;

    if(optionFields?.name || optionFields?.urlSlug){
        optionFields.urlSlug = generateSlug(req.body.name || req.body.urlSlug);
    }

    if (req.files?.images) {
        let images = [];
          for (const image of req.files.images) {
              const newPath =  generateImgNewPath(image,optionFields.name);
              fs.renameSync(image.path, newPath);
              images.push(newPath);
            }
            optionFields.images = await uploadGalleryImg(images,process.env.VRIATIONS_IMG_FOLDER);
            console.log(optionFields.images);
        }

    // Fetch existing options

    const dbexistingOptions = productVariation.options;
    // const lastOptionIndex = existingOptions.length - 1;
    const lastOption = dbexistingOptions[0]._doc;

    // if (optionFields.images) {
    //     optionFields.images = [...lastOption.images, ...optionFields.images];
    // } 
    
        console.log({...lastOption});
        console.log({...optionFields});
        console.log({...lastOption,...optionFields});

    dbexistingOptions[0] = {
        ...lastOption,
        ...optionFields,
    };


    const updatedFields = {
        productId,
        variationType,
        options:dbexistingOptions
    }
        
    const updatedProductVariation  = await ProductVariation.findByIdAndUpdate(id,updatedFields,{new: true});
    
    return res.status(200).json(
        new ApiResponse(200, updatedProductVariation , 'Product variation data updated sucessfully.')
    );
});















// update product variations 
// const updateProductVariation = asyncHandler(async (req, res) => {

//     const { id } = req.params;
//     const updateFileds = {...req.body};
//     // const {name, productId, variationType, variationValue,urlSlug, stock , price, salesPrice, status } = {...req.body};

//     if( !updateFileds.productId, !updateFileds.variationType, !updateFileds.variationValue ){
//         throw new  ApiError(400,"Product ID , variation Type and Value are required Fields.")
//     }


//     const productVariation = await ProductVariation.findById(id);
//     if (!productVariation) {
//         throw new ApiError(404, "Product Variation not found");
//     }

//     if(!updateFileds.name){
//         const productName = await Product.findById(productId).select('name');
//         const variationName = await VariationType.findById(variationType).select('name');
//         const variationValue = await VariationValue.findById(variationValue).select('value');
//         updateFileds.name = `${productName} ${variationName} ${variationValue}`;
//     }
    
//     const {productId, variationType, ...optionFields} = updateFileds;

//     if(optionFields?.name || optionFields?.urlSlug){
//         optionFields.urlSlug = generateSlug(req.body.name || req.body.urlSlug);
//     }

//     let images = [];
//     if (req.files?.images) {
//           for (const image of req.files.images) {
//               const newPath =  generateImgNewPath(image,updateFileds.name);
//               fs.renameSync(image.path, newPath);
//               images.push(newPath);
//             }
//             optionFields.images = await uploadGalleryImg(images,process.env.VRIATIONS_IMG_FOLDER);
//         }

//     // Fetch existing options


//     const existingOptions = productVariation.options;
//     const lastOptionIndex = existingOptions.length - 1;
//     const lastOption = existingOptions[lastOptionIndex];


//     if (optionFields.images) {
//         images = [...lastOption.images, ...optionFields.images];
//     } else {
//         images = [...lastOption.images];
//     }

//     existingOptions[lastOptionIndex] = {
//         ...lastOption,
//         ...optionFields,
//         images
//     };


//     const updatedFields = {
//         productId,
//         variationType,
//         options:existingOptions
//     }
        
//     const updatedProductVariation  = await ProductVariation.findByIdAndUpdate(id,updatedFields,{new: true});
    
//     return res.status(200).json(
//         new ApiResponse(200, updatedProductVariation , 'Product variation data updated sucessfully.')
//     );
// });

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
    updateProductVariation,
    deleteProductVariation
}