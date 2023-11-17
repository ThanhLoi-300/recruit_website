import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import provinceSlice from "./provinceSlice"
import jobSlice from "./jobSlice";
const store = configureStore({
    reducer : {
        auth : authSlice,
        province : provinceSlice,
        job: jobSlice
    }
})
export default store;