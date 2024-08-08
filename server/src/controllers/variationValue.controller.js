import { VariationValue } from "../models/variationValue.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createVariationValue = asyncHandler(async (req, res) => {
    const { typeId, value } = req.body;

    const valueExist = await VariationValue.find({ typeId, value });

    console.log(valueExist.length > 0);

    if (valueExist.length > 0) {
        throw new ApiError(404, 'Variation value is already exist.')
    }

    const variationValue = await VariationValue.create({ typeId, value });

    if (!variationValue) {
        throw new ApiError(500, 'Something wrong unable to create variation value.')
    }
    return res.status(201).json(
        new ApiResponse(200, variationValue, "Successfully save variation value.")
    )
});

const getVariationValues = asyncHandler(async (req, res) => {
    const variationvalues = await VariationValue.find();

    if (!variationvalues) {
        throw new ApiError(500, 'Something wrong unable to get variation value.')
    }

    return res.status(201).json(
        new ApiResponse(200, variationvalues, 'Successfully fetch data.')
    )

})

const updateVariationValue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { typeId, value } = req.body;

    const variationValExist = await VariationValue.find({ id })

    if (!variationValExist) {
        throw new ApiError(404, 'Variation id not found. please use a valid id.')
    }
    const variationValue = await VariationValue.findByIdAndUpdate(
        id,
        { typeId, value },
        { new: true }
    );

    if (!variationValue) {
        throw new ApiError(500, 'Something wrong unable to Update variation value.')
    }

    return res.status(201).json(
        new ApiResponse(200, variationValue, `variation value ${id} is sucessfully updated.`)
    )

});

const deleteVariationValue = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const variationValue = await VariationValue.findByIdAndDelete(id);

    if (!variationValue) {
        throw new ApiError(500, 'Something wrong unable to delete variation value.')
    }

    return res.status(201).json(
        new ApiResponse(200, variationValue, 'Variation value delete Sucessfully.')
    )
});

export {
    createVariationValue,
    getVariationValues,
    updateVariationValue,
    deleteVariationValue
}