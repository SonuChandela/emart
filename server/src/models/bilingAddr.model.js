import mongoose, { Schema } from "mongoose";

const billingAddrSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            require: true
        },
    }
)

export const BillingAddr = mongoose.model('BillingAddr', billingAddrSchema);