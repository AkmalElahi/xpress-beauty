import { GenerateOtpActionType } from './generate-otp.types'

export const generateOtp = payload => ({
    type: GenerateOtpActionType.REQUEST_GENERATE_OTP,
    payload
    
})
export const generateOtpSuccess = payload => ({
    type: GenerateOtpActionType.GENERATE_OTP_SUCCESS,
    payload
    
})
export const generateOtpFail = payload => ({
    type: GenerateOtpActionType.GENERATE_OTP_FAIL,
    payload
    
})