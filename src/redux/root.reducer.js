import { combineReducers } from "redux";
import servicesReducer from './services/services.reducer'
import generateOtpReducer  from './generate-otp/generate-opt.reducer'

const rootReducer = combineReducers({
    services: servicesReducer,
    generateOtp: generateOtpReducer
})

export default rootReducer