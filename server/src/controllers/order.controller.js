import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateOrderId from "../utils/gernrateOrderId.js";

const registerOrder = asyncHandler( async(req,res) => {
    const {user,payment,shippingAddr,billibgAddr,discount,shippingCharge,status,totalAmount,items} = req.body;

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

const getOrderDetails = asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
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
                    { $project: { name: 1,_id:0} }
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
                    { $project: { value: 1,_id:0} }
                ],
            }
        },
        {
            $project: {
                _id: 1,
                orderId:1,
                user: 1,
                payment:1,
                shippingAddr: 1,
                items: {
                    product: 1,
                    variation:1,
                    quantity: 1,
                    price: 1,
                    // Conditional field
                    details: {
                        $cond: {
                            if: {$eq:  [{ $type: '$items.product' }, 'missing'] },
                            then:'$items.variationDetails', 
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
        // Grouping back to the original order structure to avoid multiple rows for the same order
            {
                $group: {
                    _id: '$_id',
                    orderId: { $first: '$orderId' },
                    user: { $first: '$user' },
                    payment: { $first: '$payment'},
                    shippingAddr: { $first: '$shippingAddr'},
                    items: { $push: '$items' },
                    discount: { $first: '$discount' },
                    shippingCharge: { $first: { $ifNull: ['$shippingCharge', 0] } },
                    status: { $first: '$status' },
                    totalAmount: { $first: '$totalAmount' }
                }
            }
    ]);

    res.send(orders);
});

// const getOrderDetails = asyncHandler(async (req, res) => {
//     const orders = await Order.aggregate([
//         {
//             $lookup: {
//                 from: 'users',
//                 localField: 'user',
//                 foreignField: '_id',
//                 as: 'user',
//                 pipeline: [
//                     { $project: { name: 1, email: 1 } }
//                 ],
//             },
//         },
//         {
//             $unwind: {
//                 path: '$user',
//             }
//         },
//         {
//             $lookup: {
//                 from: 'addresses',
//                 localField: 'shippingAddr',
//                 foreignField: '_id',
//                 as: 'shippingAddr',
//                 pipeline: [
//                     { $project: { createdAt: 0, updatedAt: 0, _id: 0 } }
//                 ],
//             },
//         },
//         {
//             $unwind: {
//                 path: '$shippingAddr',
//             }
//         },
//         {
//             $unwind: {
//                 path: '$items',
//             }
//         },
//         {
//             $lookup: {
//                 from: 'products',
//                 localField: 'items.product',
//                 foreignField: '_id',
//                 as: 'items.productDetails',
//                 pipeline: [
//                     { $project: { name: 1, urlSlug: 1 } }
//                 ],
//             }
//         },
//         {
//             $unwind: {
//                 path: '$items.productDetails',
//                 preserveNullAndEmptyArrays: true // Optional, in case some items might not have a product
//             }
//         },
//         {
//             $lookup: {
//                 from: 'ProductVariation',
//                 localField: 'items.variation',
//                 foreignField: '_id',
//                 as: 'items.variationDetails',
//                 // pipeline: [
//                 //     { $project: { name: 1, urlSlug: 1 } }
//                 // ],
//             }
//         },
//         {
//             $unwind: {
//                 path: '$items.variationDetails',
//                 preserveNullAndEmptyArrays: true // Optional, in case some items might not have a variation
//             }
//         },
//         // {
//         //     $unwind: {
//         //         path: '$variationDetails',
//         //         preserveNullAndEmptyArrays: true
//         //     }
//         // },  
//         // {
//         //     $addFields: {
//         //         'items.details': {
//         //             // $mergeObjects: ['$items', '$productDetails']
//         //             $cond:{
//         //                 if: { $eq: [{ $type: '$items.product' }, 'missing'] },
//         //                 then: '$variationDetails',
//         //                 else: '$productDetails'
//         //             }
//         //         }
//         //     }
//         // },

//         // {
//         //     $addFields: {
//         //         'order.items': '$items'   
//         //     }
//         // },
//         // {
//         //     $replaceRoot: { newRoot: '$order' }
//         // }
//     ]);

//     res.send(orders);
// });



// const updateStatus = asyncHandler( async(req,res) => {

// })

// const getOrderdetails = asyncHandler( async(req,res) => {

// })

export {registerOrder, getOrderDetails};