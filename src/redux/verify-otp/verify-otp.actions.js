import { verifyOtpActionType } from './verify-otp.types'

export const verifyOtp = payload => ({
    type: verifyOtpActionType.REQUEST_VERIFY_OTP,
    payload
    
})
export const verifyOtpSuccess = payload => ({
    type: verifyOtpActionType.VERIFY_OTP_SUCCESS,
    payload
    
})
export const verifyOtpFail = payload => ({
    type: verifyOtpActionType.VERIFY_OTP_FAIL,
    payload
    
})

export const verifyNewOtpSuccess = payload => ({
    type: verifyOtpActionType.VERIFY_OTP_FOR_NEW_NUMBER_SUCCESS,
    payload
    
})