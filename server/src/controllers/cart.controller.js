import mongoose, { mongo } from 'mongoose';
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ProductVariation } from "../models/productvariation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add item to cart 
const addItemToCart = asyncHandler(async (req, res) => {
    const { userId, productId, variationId, optionId, quantity } = req.body;

    if (!productId && !variationId) {
        throw new ApiError(400, 'Either productId or variationId must be provided.');
    }

    // Find the cart for the user id 
    let cart = await Cart.findOne({ userId });

    if (cart) {
        // if item already exist in cart
        const itemIndex = cart.items?.findIndex(
            item => item.productId?.toString() === productId || item.variationId?.toString() === variationId
        );

        if (itemIndex !== -1) {
            // update quantity if item exist 
            cart.items[itemIndex].quantity += Math.round(quantity);
        } else {
            // if item doesn't exist. insert item in to cart
            cart.items.push({
                productId,
                variationId,
                optionId,
                quantity: Math.round(quantity)
            });
        }

        await cart.save();

    } else {
        // create a new cart
        cart = await Cart.create({
            userId,
            items: [{
                productId,
                variationId,
                optionId,
                quantity: Math.round(quantity)
            }]
        });
    }

    return res.status(200).json(
        new ApiResponse(200, cart || newCart, 'Item added to cart successfully')
    );
});

// update cart quantity
const updateCartQuantity = asyncHandler(async (req, res) => {
    const { id, productId, variationId, quantity } = req.body;

    if (!productId && !variationId) {
        throw new ApiError(400, 'Either productId or variationId must be provided.');
    }

    const cart = await Cart.findById(id);

    if (!cart) {
        throw new ApiError(404, "cart not found")
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId?.toString() === productId && item.variationId?.toString() === variationId)

    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity = Math.floor(quantity);
    } else {
        throw new ApiError(404, "Item not found in cart")
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart item updated successfully')
    );
});


const removeItemFromCart = asyncHandler(async (req, res) => {
    const { id, productId, variationId } = req.body;

    if (!id || !productId && !variationId) {
        throw new ApiError(400, 'Cart id, product Id and variation Id are require filedes')
    }

    const cart = await Cart.findById(id);

    const findItemIndex = cart.items?.findIndex(item => item.productId?.toString() === productId && item.variationId?.toString() === variationId)

    if (findItemIndex === -1) {
        throw new ApiError(404, 'Item not found in cart')
    } else {
        cart.items.splice(findItemIndex, 1);
    }


    if (cart.items.length === 0) {
        await cart.deleteOne();
        return res.status(200).json(new ApiResponse(200, null, 'Cart deleted successfully'));
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Item delete sucessfully')
    );
})

const removeCartById = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const cart = await Cart.findByIdAndDelete({ _id: id });

    if (!cart) {
        throw new ApiError(500, 'Something wrong unable to delete cart. Please Try again later.')
    }

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart delete sucessfully')
    );
});

const getCartByUserId = asyncHandler(async (req, res) => {
    const { userId, optionId } = req.body;
    const objId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.aggregate([
        {
            $match: {
                userId: objId
            }
        },
        {
            $unwind: "$items"
        },
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "items.productDetails",
                pipeline: [
                    { $project: { name: 1, urlSlug: 1, images: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: "$items.productDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "productvariations",
                localField: "items.variationId",
                foreignField: "_id",
                as: "items.variationDetails",
                // pipeline: [
                //     {
                //         $project: {
                //             options: {
                //                 name: 1,
                //                 urlSlug: 1,
                //                 images: 1,
                //             }
                //         }
                //     }
                // ]
            }
        },
        {
            $unwind: {
                path: "$items.variationDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        // {
        //     $project: {
        //         _id: 1,
        //         userId: 1,
        //         items: {
        //             _id: "$items._id",
        //             productId: "$items.productId",
        //             variationId: "$items.variationId",
        //             quantity: "$items.quantity",
        //             productDetails: {
        //                 $cond: {
        //                     if: { $ne: ["$items.productDetails", {}] },
        //                     then: "$items.productDetails",
        //                     else: "$items.variationDetails"
        //                 }
        //             },
        //             variationDetails: "$items.variationDetails"
        //         }
        //     }
        // },
        // {
        //     $group: {
        //         _id: "$_id", 
        //         userId: { $first: "$userId" },
        //         items: { $push: "$items" }
        //     }
        // }
    ]);

    if (!cart || cart.length === 0) {
        throw new ApiError(500, 'Something went wrong; unable to fetch cart details. Please try again later.');
    }

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart details fetched successfully')
    );
});


// const getCartByUserId = asyncHandler(async (req, res) => {
//     const { userId, optionId } = req.body;
//     const objId = new mongoose.Types.ObjectId(userId);

//     const cart = await Cart.aggregate([
//         {
//             $match: {
//                 userId: objId
//             }
//         },
//         {
//             $unwind: "$items"
//         },
//         {
//             $lookup: {
//                 from: "products",
//                 localField: "items.productId",
//                 foreignField: "_id",
//                 as: "items.productDetails",
//                 pipeline: [
//                     { $project: { name: 1, urlSlug: 1, images: 1 } }
//                 ],
//             }
//         },
//         {
//             $unwind: {
//                 path: "$items.productDetails",
//                 preserveNullAndEmptyArrays: true
//             }
//         },
//         {
//             $lookup: {
//                 from: "productvariations",
//                 localField: "items.variationId",
//                 foreignField: "_id",
//                 as: "items.variationDetails",
//                 pipeline: [
//                     {
//                         $project: {
//                             options: {
//                                 name: 1,
//                                 urlSlug: 1,
//                                 images: 1,
//                             }
//                         }
//                     }
//                 ]
//             }
//         },
//         {
//             $unwind: {
//                 path: "$items.variationDetails",
//                 preserveNullAndEmptyArrays: true
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 userId: 1,
//                 items: {
//                     _id: "$items._id",
//                     productId: "$items.productId",
//                     variationId: "$items.variationId",
//                     quantity: "$items.quantity",
//                     productDetails: {
//                         $cond: {
//                             if: { $ne: ["$items.productDetails", {}] },
//                             then: "$items.productDetails",
//                             else: "$items.variationDetails"
//                         }
//                     },
//                     variationDetails: "$items.variationDetails"
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: "$_id",
//                 userId: { $first: "$userId" },
//                 items: { $push: "$items" }
//             }
//         }
//     ]);

//     if (!cart || cart.length === 0) {
//         throw new ApiError(500, 'Something went wrong; unable to fetch cart details. Please try again later.');
//     }

//     return res.status(200).json(
//         new ApiResponse(200, cart, 'Cart details fetched successfully')
//     );
// });
export {
    addItemToCart,
    updateCartQuantity,
    removeItemFromCart,
    removeCartById,
    getCartByUserId
}
