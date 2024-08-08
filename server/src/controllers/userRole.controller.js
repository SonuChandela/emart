import { UserRole } from "../models/userRole.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUserRole = asyncHandler(async (req, res) => {
    const { role_name } = req.body

    if (!role_name) {
        throw new ApiError(400, 'User Role is required filed.')
    }

    const roleExisted = await UserRole.findOne({ role_name })

    if (roleExisted) {
        throw new ApiError(403, 'User role is already register.')
    }

    const role = await UserRole.create({
        role_name
    })

    if (!role) {
        throw new ApiError(500, "Something went wrong please try again later.")
    }

    return res.status(201).json(
        new ApiResponse(200, role, "User registered Successfully")
    )
})

const getUserRole = asyncHandler(async (req, res) => {
    const getRoles = await UserRole.find();

    if (!getRoles) {
        throw new ApiError(500, "Something went wrong can't get data from server try again later.")
    }

    return res.status(201).json(
        new ApiResponse(200, getRoles, "User roles data fatch Successfully")
    )
})

export {
    registerUserRole,
    getUserRole
}