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
import notificationsReducer from "./notifications/notifications.reducer";
import skillsReducer from "./skills/skills.reducer";
import toolsReducer from "./tools/tools.reducer";
import jobsReducer from "./jobs/jobs.reducer";
import galleryReducer from "./gallery/gallery.reducer";
import helpReducer from "./Help/help.reducer";

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
    beauticians: beauticianReducer,
    notifications: notificationsReducer,
    skills: skillsReducer,
    tools: toolsReducer,
    jobs: jobsReducer,
    gallery: galleryReducer,
    help: helpReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer