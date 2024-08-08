import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./Features/ProductSlice";
import cartReducer from "./Features/CartSlice";
import userReducer from "./Features/UserSlice";
import wishlistReducer from "./Features/WishListSlice";
import usersApi from './Features/userApi';
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});