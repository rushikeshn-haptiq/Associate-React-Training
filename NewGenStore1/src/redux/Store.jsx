import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from './SearchSlice';
import authReducer from './authSlice';
import cartReducer from "./CartSlice";
import wishlistReducer from './wishlistSlice';
export const store = configureStore({
    reducer:{
        search:SearchReducer,
        auth: authReducer,
         cart: cartReducer,
        wishlist: wishlistReducer,
    }
})