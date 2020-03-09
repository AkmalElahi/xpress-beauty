import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import servicesReducer from './catagories/catagories.reducer'
import generateOtpReducer from './generate-otp/generate-opt.reducer'
import userReducer from './user/user.reducer'
import promotionsReducer from "./promotions/promotions.reducer";
import countriesReducer from "./countries/countries.reducer";
import verifyOtpReducer from './verify-otp/verify-otp.reducer'
import cartReducer from "./cart/cart.reducer";

const rootReducer = combineReducers({
    categories: servicesReducer,
    generateOtp: generateOtpReducer,
    user: userReducer,
    promotions: promotionsReducer,
    countries: countriesReducer,
    verifyOtp: verifyOtpReducer,
    cart: cartReducer
})

export default rootReducer