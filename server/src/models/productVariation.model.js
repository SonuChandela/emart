import mongoose, { Schema } from "mongoose";
import { productImageSchema } from "./ProductImage.model.js";

const VariationOptionSchema = new Schema({
    variationValue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariationValue',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    urlSlug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    images: [productImageSchema]
}); 

const ProductVariationSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    variationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariationType',
        required: true
    },
    options: [VariationOptionSchema],
}, {
    timestamps: true
});


export  const ProductVariation = mongoose.models.ProductVariation || mongoose.model('ProductVariation', ProductVariationSchema);

