import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verfyjwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header('Authorization')?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(403, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})

// const refreshAccessToken = asyncHandler(async (req, res, next) => {
//     try {
//         const refreshToken = req.cookies?.refreshToken

//         const user = await User.findOne({ "refreshToken": refreshToken })

//         if (!user) {
//             throw new ApiError(403, "Token session expired.")
//         }

//         const refreshedToken = user.generateAccessToken();

//         const cookieOptions = {
//             httpOnly: true,
//             secure: true
//         }

//         console.log(refreshedToken)
//         next()
//     } catch (error) {
//         throw new ApiError(505, error?.message || "Invalid Token.")
//     }
// })

export { verfyjwt }