import mongoose from "mongoose"
import { User } from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        return { refreshToken, accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generate referesh and acess token")
    }
}

const userRegister = asyncHandler(async (req, res) => {
    // get data from body
    const { name, email, mobile, password, status } = req.body

    // check all fildes are not empty 

    const emptyField = [name, email, password, mobile].some((field) => field?.trim() === "")
    if (emptyField) {
        throw new ApiError(404, "all fields are required.")
    }
    // check name and email is already register or not

    const userExisted = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (userExisted) {
        throw new ApiError(500, "User name or email is already register.")
    }

    const avatarPath = req.file?.path;

    // if (!avatarPath) {
    //     throw new ApiError(404, 'user Avatar is required filed')
    // }

    const user = await User.create({
        name: name.toLowerCase(),
        email,
        // avatar: avatarPath.toString(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


// login user 

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // find user 

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "user not found.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User loged in successfully"
            )
        )
})

// logout user 

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(200, {}, "User logged out")
        )
})

export {
    userRegister,
    loginUser,
    logoutUser
}