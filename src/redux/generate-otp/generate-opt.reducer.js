import { GenerateOtpActionType } from './generate-otp.types'

const INITIAL_STATE = {
    success: false,
    phone: null,
    error: false
}

const generateOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GenerateOtpActionType.REQUEST_GENERATE_OTP:
            return {
                ...state,
                phone: action.payload
            }
        case GenerateOtpActionType.GENERATE_OTP_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: action.payload
            }
        case GenerateOtpActionType.GENERATE_OTP_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                payload
            }
        default:
            return state
    }
}

export default generateOtpReducer