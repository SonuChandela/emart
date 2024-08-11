import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        parentCatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        name: {
            type: String,
            lowercase: true,
            require: true,
            index: true
        },
        urlSlug: {
            type: String
        },
        description: {
            type: String,
            required: false
        },
        ancestors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
    },
    {
        timestamps: true
    }
)

export const Category = mongoose.model('Category', categorySchema);