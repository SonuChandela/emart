import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
            require: true
        },
        shippingAddr: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shipping',
            require: true
        },
        billingAddr: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'billing'
        },
        discount: {
            type: Number,
            default: 0
        },
        shippingCharge: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['confirm', 'processing', 'shipped', 'delivered', 'pending', 'cancelled', 'returned', 'refunded'],
            default: 'Pending',
            required: true
        },
        totalAmount: {
            type: Number
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                variation: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductVariation'
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }

)

export const Order = mongoose.model('Order', orderSchema);