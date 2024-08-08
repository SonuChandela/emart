import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"


const renewAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken
    console.log(refreshToken);
    if (!refreshToken) {
        throw new ApiError(403, "Refresh token is require.")
    }

    const verifedPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(verifedPayload._id)

    if (!user) {
        throw new ApiError(401, 'User not found')
    }

    const newAccessToken = user.generateAccessToken();

    return res.status(201).json(
        new ApiResponse(200, newAccessToken, "Access Token renew successfully")
    )


}

export { renewAccessToken }