import express from "express"
import cors from "cors"
import userRoute from './routes/users.routes.js';
import authRoute from './routes/auth.routes.js';
import userRoleRoute from './routes/userRole.routes.js';
import categoryRoute from './routes/category.routes.js';
import productRoute from './routes/product.routes.js';
import variationTypeRoute from './routes/variationType.routes.js';
import variationValueRoute from './routes/variationValue.routes.js';
import productVariation from './routes/productVariation.routes.js';
import cartRoute from './routes/cart.routes.js';
import addressRoute from './routes/address.routes.js';
import orderRoute from './routes/order.routes.js';
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json())

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/role', userRoleRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/variationtype', variationTypeRoute);
app.use('/api/variationvalue', variationValueRoute);
app.use('/api/productvariation', productVariation);
app.use('/api/cart', cartRoute);
app.use('/api/address',addressRoute);
app.use('/api/order',orderRoute);


export { app }