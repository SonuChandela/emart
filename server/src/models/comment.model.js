import { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        comment: {
            type: String,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
)

export const Comment = mongoose.model('Comment', commentSchema)