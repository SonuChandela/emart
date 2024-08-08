import { VariationType } from "../models/variationType.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createVariationType = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const typeExist = await VariationType.find({ name });

    if (typeExist.length > 0) {
        throw new ApiError(404, 'Variation Type already exist.')
    }

    const variationType = await VariationType.create({ name });

    if (!variationType) {
        throw new ApiError(500, 'Something wrong unable to create variation Type.')
    }
    return res.status(201).json(
        new ApiResponse(200, variationType, "Successfully created variation Type.")
    )

})

const getVariationTypes = asyncHandler(async (req, res) => {
    const variationTypes = await VariationType.find();

    if (!variationTypes) {
        throw new ApiError(500, 'Something wrong unable to get variation Type.')
    }

    return res.status(201).json(
        new ApiResponse(200, variationTypes, 'Successfully fetch data.')
    )

})

const updateVariationType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const variationIdExist = await VariationType.find({ id })

    if (!variationIdExist) {
        throw new ApiError(400, 'Variation id not found. please use a valid id.')
    }

    const updateVariation = await VariationType.findByIdAndUpdate(id, { name }, { new: true })


    if (!updateVariation) {
        throw new ApiError(500, 'Something wrong unable to Update variation Type.')
    }

    return res.status(201).json(
        new ApiResponse(200, updateVariation, `variation ${id} is sucessfully updated.`)
    )
})


const deleteVariationById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const variationIdExist = await VariationType.find({ id })

    if (!variationIdExist) {
        throw new ApiError(400, 'Variation id not found. please use a valid id.')
    }

    const deleteVariation = await VariationType.findByIdAndDelete(id);

    if (!deleteVariation) {
        throw new ApiError(500, 'Something wrong unable to delete variation Type.')
    }

    return res.status(201).json(
        new ApiResponse(200, deleteVariation, 'Variation Type delete Sucessfully.')
    )
})
export {
    createVariationType,
    getVariationTypes,
    updateVariationType,
    deleteVariationById
}