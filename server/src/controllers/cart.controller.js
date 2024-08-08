import mongoose from 'mongoose';
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ProductVariation } from "../models/productvariation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
    const { userId, productId, variationId, quantity } = req.body;

    if (!productId && !variationId) {
        throw new ApiError(400, 'Either productId or variationId must be provided.');
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        await Cart.create({ userId, items: [] })
    }


    if (productId) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }
    }

    if (variationId) {
        const productVariation = await ProductVariation.findById(variationId);
        if (!productVariation) {
            throw new ApiError(404, 'Product variation not found');
        }
    }

    const existingItemIndex = cart.items?.findIndex(
        item => item.productId.toString() === productId || item.variationId.toString() === variationId
    );

    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += Math.floor(quantity);
    } else {
        cart.items.push({
            productId,
            variationId,
            quantity
        });
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Item added to cart successfully')
    );
});


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
        await cart.items.splice(findItemIndex, 1);
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Item delete sucessfully')
    );
})
export {
    addItemToCart,
    updateCartQuantity,
    removeItemFromCart
}
