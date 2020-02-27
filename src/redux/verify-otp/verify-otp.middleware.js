import { verifyOtp, verifyOtpSuccess, verifyOtpFail } from './verify-otp.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const VerifyOtpMiddleWare =  ({ phone, otp}) => {
    return  async dispatch=>{
        dispatch(verifyOtp(phone))
           try {
               formData.append("mobile", phone)
               formData.append("language", "en")
               formData.append("otp", otp)
               formData.append("user_type", "customer")
             let res = await fetch(Path.VERIFY_OTP, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            if(res.message === "OTP Generated"){
                console.log("RESPONSE", res)
                dispatch(verifyOtpSuccess(res.message))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(verifyOtpFail(error))
           }
    }
}