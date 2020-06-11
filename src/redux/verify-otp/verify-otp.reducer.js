import { verifyOtpActionType } from './verify-otp.types'

const INITIAL_STATE = {
    success: false,
    phone: null,
    error: false,
    appuid: "",
    token: "",
    message: "",
    isLoading:false
}

const verifyOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case verifyOtpActionType.REQUEST_VERIFY_OTP:
            return {
                ...state,
                phone: action.payload,
                success: false,
                error: false,
                message: "verify otp request",
                isLoading:true
            }
        case verifyOtpActionType.VERIFY_OTP_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: "otp verified successfully",
                appuid: action.payload.appuid,
                token: action.payload.token,
                isLoading:false
            }
        case verifyOtpActionType.VERIFY_OTP_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in otp verification",
                isLoading:false
            }
        case verifyOtpActionType.VERIFY_OTP_FOR_NEW_NUMBER_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: "otp for new number verified successfully",
                isLoading:false
            }
        default:
            return state
    }
}

export default verifyOtpReducer