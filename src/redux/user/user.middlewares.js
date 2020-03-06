import { createUserProfile, createUserProfileSuccess, createUserProfileFail } from './user.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const userMiddleWare =  (data) => {
    return  async dispatch=>{
        dispatch(createUserProfile(data))
           try {
               formData.append("language", "en")
               formData.append("username", data.user.username )
               formData.append("email", data.user.email)
               formData.append("dob", data.user.dob)
               formData.append("user_type", data.user.user_type)
               formData.append("address",data.address)
               formData.append("country_id",166)
             let res = await fetch(Path.UPDATE_PROFILE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("UPDATE PROFILE RESPONSE", res)
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