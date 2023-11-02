import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import provinceSlice from "./provinceSlice"
const store = configureStore({
    reducer : {
        auth : authSlice,
        province : provinceSlice
    }
})
export default store;

