import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connetDB = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.DATABASE_URI}${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${dbConnection.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
    }
}

export default connetDB