import mongoose, { Schema } from "mongoose";

const variationTypeSchema = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    name: {
        type: String,
        require: true,
        lowercase: true,
    },
}, {
    timestamps: true
})

export const VariationType = mongoose.model('VariationType', variationTypeSchema);