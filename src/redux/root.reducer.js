import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import servicesReducer from './catagories/catagories.reducer'
import generateOtpReducer from './generate-otp/generate-opt.reducer'
import userReducer from './user/user.reducer'
import promotionsReducer from "./promotions/promotions.reducer";
import countriesReducer from "./countries/countries.reducer";
import verifyOtpReducer from './verify-otp/verify-otp.reducer'
import cartReducer from "./cart/cart.reducer";
import bookingsReducer from "./bookings/bookings.reducers";
import beauticianReducer from "./beautician/beautician.reducer";

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'user',
    ],
  };
const rootReducer = combineReducers({
    cart: cartReducer,
    categories: servicesReducer,
    generateOtp: generateOtpReducer,
    user: userReducer,
    promotions: promotionsReducer,
    countries: countriesReducer,
    verifyOtp: verifyOtpReducer,
    bookings: bookingsReducer,
    beauticians: beauticianReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer