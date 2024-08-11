import mongoose, { Mongoose, Schema } from "mongoose";

const userRoleSchema = new Schema({
    name: {
        type: String,
        enum: ['admin', 'vendor', 'customer']
    }
},
    {
        timestamps: true
    }
)

export const UserRole = mongoose.model("UserRole", userRoleSchema)