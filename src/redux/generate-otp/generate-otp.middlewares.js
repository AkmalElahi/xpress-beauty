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
            else{
               dispatch(generateOtpFail({errMessage:res.message}))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("OTP ERROR", error)
               dispatch(generateOtpFail(error))
           }
    }
}

export const changeUserMobileMiddleWare =  (data) => {
    return  async dispatch=>{
        dispatch(generateOtp(data.newMobile))
           try {
               formData.append("mobile", data.mobile)
               formData.append("newmobile", data.newMobile)
               formData.append("language", "en")
               formData.append("appuid", data.appuid)
               formData.append("token", data.token)
             let res = await fetch(Path.CHNAGE_NUMBER, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("CHANGE NUMBER RESPONSE", res)
            if(res.message === "OTP Generated"){
                console.log("RESPONSE", res)
                dispatch(generateOtpSuccess(res.message))
            }
            else{
               dispatch(generateOtpFail({errMessage:res.message}))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("OTP ERROR", error)
               dispatch(generateOtpFail(error))
           }
    }
}