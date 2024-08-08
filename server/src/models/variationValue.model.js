import mongoose, { Schema } from "mongoose";

const variationValuesSchema = new Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariationType',
        require: true
    },
    value: {
        type: String,
        require: true,
        lowercase: true,
    },
}, {
    timestamps: true
})

export const VariationValue = mongoose.model('VariationValue', variationValuesSchema);