import mongoose from "mongoose";
import { Address } from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add address 
const addAddress = asyncHandler(async (req, res) => {
    const { userId, street, city, state, postalCode, country } = req.body;

    if (!userId || !street || !postalCode || !state || !country) {
        throw new ApiError(400, 'fill require fileds of address');
    }

    const address = new Address({
        userId, street, city, state, postalCode, country
    });

    await address.save();

    if (!address) {
        throw new ApiError(500, 'Something wrong unable to add address.');
    }

    return res.status(200).json(
        new ApiResponse(200, address, 'Address added Sucessfully')
    )
});

// get address by id
const getAddressByUserId = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const userIdObj = new mongoose.Types.ObjectId(userId);

    const addressByUserId = await Address.aggregate([
        {
            $match: { userId: userIdObj }
        }
    ]);

    if (!addressByUserId) {
        throw new ApiError(500, "Uable to fetch address. Try again later.")
    }

    return res.status(200).json(
        new ApiResponse(200, addressByUserId, 'Address fetch sucessfully.')
    )

});

// update address
const updateAddress = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const updatedAddr = { ...req.body };

    if (!id) {
        throw new ApiError(400, 'Please define address id. Id is require field.')
    }

    const address = await Address.findByIdAndUpdate(id, updatedAddr, { new: true });

    if (!address) {
        throw new ApiError(500, 'unable to update data. please try again after some time.')
    }

    return res.status(200).json(
        new ApiResponse(200, address, 'Address updated sucessfully.')
    )
});

// delete address by id
const deleteAddressById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Please define address id. Id is require field.')
    }

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
        throw new ApiError(500, 'unable to delete data. please try again after some time.')
    }

    return res.status(200).json(
        new ApiResponse(200, address, 'Address deleted suncessfully.')
    )
})

export { addAddress, getAddressByUserId, updateAddress, deleteAddressById };
