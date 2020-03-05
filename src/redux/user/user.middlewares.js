import { createUserProfile, createUserProfileSuccess, createUserProfileFail } from './user.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const userMiddleWare =  (data) => {
    return  async dispatch=>{
        dispatch(createUserProfile(data))
           try {
               formData.append("mobile", mobile )
               formData.append("language", "en")
               formData.append("otp", otp)
               formData.append("user_type", "customer")
             let res = await fetch(Path.VERIFY_OTP, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("VERIFY OTP RES", res)
            if(res.message === "success"){
                console.log("RESPONSE", res)
                dispatch(createUserProfileSuccess(res.message))
            }
            else{
                dispatch(createUserProfileFail(res.message))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(createUserProfileFail(error))
           }
    }
}