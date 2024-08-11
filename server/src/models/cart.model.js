import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                variationId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductVariation',
                },
                optionId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ]
    },
    {
        timestamps: true
    })

export const Cart = mongoose.model('Cart', cartSchema)