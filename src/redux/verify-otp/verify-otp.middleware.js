import { verifyOtp, verifyOtpSuccess, verifyOtpFail } from './verify-otp.actions'
import { setUserProfile } from '../user/user.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const VerifyOtpMiddleWare =  ({ otp, mobile, user_type}) => {
    return  async dispatch=>{
        dispatch(verifyOtp(mobile))
           try {
               formData.append("mobile", mobile )
               formData.append("language", "en")
               formData.append("otp", otp)
               formData.append("user_type", user_type)
             let res = await fetch(Path.VERIFY_OTP, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("VERIFY OTP RES", res)
            if(res.message === "success"){
                console.log("RESPONSE", res)
                dispatch(setUserProfile({
                    username:res.data.username,
                    email:res.data.email,
                    dob: res.data.date_of_birth,
                    token: res.data.token,
                    appuid: res.data.appuid,
                }))
                dispatch(verifyOtpSuccess({
                    token: res.data.token,
                    appuid: res.data.appuid,
                    username:res.data.username,
                    email:res.data.email,
                    dob: res.data.dob,
                    message: res.message,
                    building:res.data.building,
                    house:res.data.house,
                    city:res.data.city,
                    area:res.data.area,
                    street:res.data.street,
                }))
            }
            else{
                dispatch(verifyOtpFail(res.message))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(verifyOtpFail(error))
           }
    }
}