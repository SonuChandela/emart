import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateOrderId from "../utils/gernrateOrderId.js";

const registerOrder = asyncHandler(async (req, res) => {
    const { user, payment, shippingAddr, billibgAddr, discount, shippingCharge, status, totalAmount, items } = req.body;

    if (!user || !payment || !shippingAddr || !totalAmount || !items || items.length === 0) {
        throw new ApiError(400, 'Required fields are missing');
    }

    const orderId = generateOrderId();

    const newOrder = new Order({
        orderId,
        user,
        payment,
        shippingAddr,
        discount,
        shippingCharge,
        status,
        totalAmount,
        items
    });

    await newOrder.save();

    res.status(201).json(new ApiResponse(201, newOrder, 'Order created successfully'));
});

const getOrderDetailsById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const ordersDetails = await Order.aggregate([
        {
            $match: { orderId: id }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    { $project: { name: 1, email: 1 } }
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'addresses',
                localField: 'shippingAddr',
                foreignField: '_id',
                as: 'shippingAddr',
                pipeline: [
                    { $project: { createdAt: 0, updatedAt: 0, _id: 0 } }
                ],
            },
        },
        {
            $unwind: {
                path: '$shippingAddr',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$items',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.productDetails',
                pipeline: [
                    { $project: { name: 1, urlSlug: 1 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$items.productDetails',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'productvariations',
                localField: 'items.variation',
                foreignField: '_id',
                as: 'items.variationDetails',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            variationType: 1,
                            options: {
                                variationValue: 1,
                                name: 1,
                                urlSlug: 1
                            }
                        }
                    }
                ],
            }
        },
        {
            $unwind: {
                path: '$items.variationDetails',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$items.variationDetails.options',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'variationtypes',
                localField: 'items.variationDetails.variationType',
                foreignField: '_id',
                as: 'items.variationDetails.variationType',
                pipeline: [
                    { $project: { name: 1, _id: 0 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$items.variationDetails.variationType',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'variationvalues',
                localField: 'items.variationDetails.options.variationValue',
                foreignField: '_id',
                as: 'items.variationDetails.options.variationValue',
                pipeline: [
                    { $project: { value: 1, _id: 0 } }
                ],
            }
        },
        {
            $unwind: {
                path: '$items.variationDetails.options.variationValue',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                orderId: 1,
                user: 1,
                payment: 1,
                shippingAddr: 1,
                items: {
                    product: 1,
                    variation: 1,
                    quantity: 1,
                    price: 1,
                    details: {
                        $cond: {
                            if: { $eq: [{ $type: '$items.product' }, 'missing'] },
                            then: '$items.variationDetails',
                            else: '$items.productDetails'
                        }
                    }
                },
                discount: 1,
                shippingCharge: { $ifNull: ['$shippingCharge', 0] },
                status: 1,
                totalAmount: 1
            }
        },
        {
            $group: {
                _id: '$_id',
                orderId: { $first: '$orderId' },
                user: { $first: '$user' },
                payment: { $first: '$payment' },
                shippingAddr: { $first: '$shippingAddr' },
                items: {
                    $push: '$items'
                },
                discount: { $first: '$discount' },
                shippingCharge: { $first: { $ifNull: ['$shippingCharge', 0] } },
                status: { $first: '$status' },
                totalAmount: { $first: '$totalAmount' }
            }
        }
    ]);

    if (!ordersDetails) {
        throw new ApiError(500, "Unable to fetch order data. Please try again later.")
    }

    res.status(201).json(new ApiResponse(201, ordersDetails, 'Order details fetch successfully.'));
});


const updateOrderStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate({ orderId: id }, { status: status }, { new: true });

    if (!order) {
        throw new ApiError(404, 'Order not found');
    }

    res.status(200).json(
        new ApiResponse(200, order, 'Order status updated successfully')
    );
})


export { registerOrder, getOrderDetailsById, updateOrderStatus };