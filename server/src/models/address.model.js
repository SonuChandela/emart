import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        street: {
            type: String,
            required: true,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
            required: true,
          },
          postalCode: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          }
    },
    {  
        timestamps: true
    }
)

export const Address = mongoose.model('Address', addressSchema);