import { generateOtp, generateOtpSuccess, generateOtpFail } from './genarate-otp.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const generateOtpMiddleWare =  (phone) => {
    return  async dispatch=>{
        dispatch(generateOtp(phone))
           try {
               formData.append("mobile", phone)
               formData.append("language", "en")
               formData.append("activity", "register")
             let res = await fetch(Path.GENERATE_OTP, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            if(res.message === "OTP Generated"){
                console.log("RESPONSE", res)
                dispatch(generateOtpSuccess(res.message))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(generateOtpFail(error))
           }
    }
}