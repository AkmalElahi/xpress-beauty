import { GenerateOtpActionType } from './generate-otp.types'

const INITIAL_STATE = {
    success: false,
    phone: null,
    error: false,
    message:""
}

const generateOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GenerateOtpActionType.REQUEST_GENERATE_OTP:
            return {
                ...state,
                success:false,
                error:false,
                phone: action.payload,
                message:"generate otp request"
            }
        case GenerateOtpActionType.GENERATE_OTP_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message:"otp generated successfully"
            }
        case GenerateOtpActionType.GENERATE_OTP_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                payload,
                message:"error in generating otp"
            }
        default:
            return state
    }
}

export default generateOtpReducer