import { createUserProfile, createUserProfileSuccess, createUserProfileFail, checkStatus, 
    checkStatusSuccess, checkStatusFail, setFreelancerProfile, setUserProfile } from './user.actions'
import Path from '../../configs/path'
import { Platform } from 'react-native'
import { getUniqueId, getModel, getDevice } from 'react-native-device-info'
const formData = new FormData()

export const userMiddleWare = (data) => {
    return async dispatch => {
        dispatch(createUserProfile(data))
        try {
            // const device_id = getUniqueId()
            // const model = getModel()
            // const os = Platform.Version
            // const platform = Platform.OS
            // let device = ""
            // await getDevice().then(d => divice = d)
            console.log("DATA IN MILDDLEQARE", data)
            if (data.user.user_type === 'freelancer') {
                formData.append("building", data.user.building)
                formData.append("street", data.user.street)
                formData.append("area", data.user.area)
                formData.append("city", data.user.city)
                formData.append("house", data.user.house)
                formData.append("upload_file", data.file)
                formData.append("freelancer_skills", data.skills.toString())
                formData.append("freelancer_tools", data.tools.toString())
                formData.append("training", data.training)
                formData.append("language", "en")
                formData.append("appuid", data.user.appuid)
                formData.append("token", data.user.token)
                formData.append("username", data.user.username)
                formData.append("email", data.user.email)
                formData.append("dob", data.user.dob)
                formData.append("user_type", data.user.user_type)
                formData.append("cnic", data.user.cnic)
                formData.append("country_id", 166)
                formData.append("device", data.device)
                formData.append("device_id", data.device_id)
                formData.append("model", data.model)
                formData.append("os", data.os)
                formData.append("platform", data.platform)
            }
            else {
                formData.append("language", "en")
                formData.append("appuid", data.user.appuid)
                formData.append("token", data.user.token)
                formData.append("username", data.user.username)
                formData.append("email", data.user.email)
                formData.append("dob", data.user.dob)
                formData.append("user_type", data.user.user_type)
                formData.append("country_id", 166)
                formData.append("device", data.device)
                formData.append("device_id", data.device_id)
                formData.append("model", data.model)
                formData.append("os", data.os)
                formData.append("platform", data.platform)
            }
            console.log("FORM DATA", formData)
            let res = await fetch(Path.UPDATE_PROFILE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("UPDATE PROFILE RESPONSE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                if (data.user.user_type === "customer") {
                    console.log("SETTING CUSTOMER PROFILE IN MIDDLEWARE", res.data)
                    dispatch(setUserProfile({
                        username: data.user.username,
                        email: data.user.email,
                        dob: data.user.date_of_birth,
                        token: data.user.token,
                        appuid: data.user.appuid,
                    }))
                }
                if (data.user.user_type === 'freelancer') {
                    console.log("SETTING FREELANCER PROFILE IN MIDDLEWARE", res.data)
                    dispatch(setFreelancerProfile({
                        username: data.user.username,
                        email: data.user.email,
                        dob: data.user.date_of_birth,
                        token: data.user.token,
                        appuid: data.user.appuid,
                        building: data.user.building,
                        house: data.user.house,
                        city: data.user.city,
                        area: data.user.area,
                        street: data.user.street,
                        tools: data.tools,
                        skills: data.skills,
                        training: data.training,
                        cnic:data.user.cnic
                    }))
                }
                dispatch(createUserProfileSuccess(res.message))
            }
            else {
                dispatch(createUserProfileFail(res.message))
            }
        } catch (error) {
            console.log("ERROR IN USER PROFILE", error)
            dispatch(createUserProfileFail(error))
        }
    }
}

export const checkFreelancerStatus = (data) => {
    return  async dispatch=>{
        dispatch(checkStatus())
           try {
            //    console.log("DATA IN CHECK",data)
               formData.append("appuid", data.appuid )
               formData.append("language", "en")
               formData.append("token", data.token)
             let res = await fetch(Path.CHECK_STATUS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("RESPONSE OF CHECK", res)
                dispatch(checkStatusSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(checkStatusFail(error))
           }
    }
}