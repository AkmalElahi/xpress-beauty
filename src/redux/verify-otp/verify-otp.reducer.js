import { verifyOtpActionType } from './verify-otp.types'

const INITIAL_STATE = {
    success: false,
    phone: null,
    error: false,
    appuid:"",
    token:""
}

const verifyOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case verifyOtpActionType.REQUEST_VERIFY_OTP:
            return {
                ...state,
                phone: action.payload
            }
        case verifyOtpActionType.VERIFY_OTP_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: action.payload.message,
                appuid:action.payload.appuid,
                token:action.payload.token
            }
        case verifyOtpActionType.VERIFY_OTP_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message:action.payload
            }
        default:
            return state
    }
}

export default verifyOtpReducer