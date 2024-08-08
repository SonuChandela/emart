import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';
import {v2 as cloudinary} from "cloudinary"
import events from 'events';
// Set path to .env file

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


events.EventEmitter.defaultMaxListeners = 20;

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })