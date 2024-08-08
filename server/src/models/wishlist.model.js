import mongoose, { MongooseError, Schema } from "mongoose";

const wishlistSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        variation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductVariation',
        }
    },
    {
        timestamps: true
    }
)

export const Wishlist = mongoose.model('Wishlist', wishlistSchema)