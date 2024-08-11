import mongoose, { Schema } from "mongoose";
import { productImageSchema } from "./ProductImage.model.js";



const productSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        index: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        lowercase: true
    },
    images: [productImageSchema],
    urlSlug: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number
    },
    variations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductVariation',
        }
    ],
}, {
    timestamps: true
})

export const Product = mongoose.model('Product', productSchema)