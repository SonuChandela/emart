import mongoose, { Schema } from "mongoose";

export const productImageSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    altText: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['thumbnail', 'gallery'],
        required: true,
    },
})

