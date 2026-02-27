import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import jobReducer from "./jobSlice"
const appStore=configureStore({
    reducer:{
        user:userReducer,
        job:jobReducer,
    },
});

export default appStore