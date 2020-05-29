import { GenerateOtpActionType } from './generate-otp.types'

const INITIAL_STATE = {
    success: false,
    phone: null,
    error: false,
    message:"",
    isloading:false,
    errMessage:""
}

const generateOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GenerateOtpActionType.REQUEST_GENERATE_OTP:
            return {
                ...state,
                success:false,
                error:false,
                phone: action.payload,
                message:"generate otp request",
                isloading:true,
            }
        case GenerateOtpActionType.GENERATE_OTP_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message:"otp generated successfully",
                isloading:false
            }
        case GenerateOtpActionType.GENERATE_OTP_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message:"error in generating otp",
                errMessage:action.payload.errMessage,
                isloading:false
            }
        default:
            return state
    }
}

export default generateOtpReducer