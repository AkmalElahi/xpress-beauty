import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import servicesReducer from './services/services.reducer'
import generateOtpReducer  from './generate-otp/generate-opt.reducer'
import  userReducer from './user/user.reducer'

const rootReducer = combineReducers({
    services: servicesReducer,
    generateOtp: generateOtpReducer,
    user: userReducer
})

export default rootReducer