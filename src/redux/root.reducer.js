import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import servicesReducer from './catagories/catagories.reducer'
import generateOtpReducer  from './generate-otp/generate-opt.reducer'
import  userReducer from './user/user.reducer'
import promotionsReducer from "./promotions/promotions.reducer";

const rootReducer = combineReducers({
    services: servicesReducer,
    generateOtp: generateOtpReducer,
    user: userReducer,
    promotions: promotionsReducer
})

export default rootReducer