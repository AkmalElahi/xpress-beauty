import { createUserProfile, createUserProfileSuccess, createUserProfileFail } from './user.actions'
import Path from '../../configs/path'
import { Platform } from 'react-native'
import { getUniqueId, getModel, getDevice } from 'react-native-device-info'
const formData = new FormData()

export const userMiddleWare = (data) => {
    return async dispatch => {
        dispatch(createUserProfile(data))
        try {
            const device_id = getUniqueId()
            const model = getModel()
            const os = Platform.Version
            const platform = Platform.OS
            let device = ""
            await getDevice().then(d => divice = d)
            formData.append("language", "en")
            formData.append("appuid", data.user.appuid)
            formData.append("token", data.user.token)
            formData.append("username", data.user.username)
            formData.append("email", data.user.email)
            formData.append("dob", data.user.dob)
            formData.append("user_type", data.user.user_type)
            formData.append("country_id", 166)
            formData.append("device", device)
            formData.append("device_id", device_id)
            formData.append("model", model)
            formData.append("os", os)
            formData.append("platform", "address")
            formData.append("building", "address")
            formData.append("street", "address")
            formData.append("area", "address")
            formData.append("city", "address")
            formData.append("house", "address")
            formData.append("address_note", "address")
            // formData.append("building", data.building)
            // formData.append("street", data.street)
            // formData.append("area", data.area)
            // formData.append("city", data.city)
            // formData.append("house", data.house)
            // formData.append("address_note", data.address_note)
            console.log("FORM DATA",JSON.stringify(formData))
            // console.log("DATE OF BIRTH", data.user.dob)
            // console.log("FORM DATA" ,formData)
            let res = await fetch(Path.UPDATE_PROFILE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // let res = await Axios({
            //         method: 'post',
            //         url : Path.UPDATE_PROFILE,
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //         data: formData
            //     })
            console.log("UPDATE PROFILE RESPONSE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                dispatch(createUserProfileSuccess(res.message))
            }
            else {
                dispatch(createUserProfileFail(res.message))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
        } catch (error) {
            console.log("ERROR IN USER PROFILE", error)
            dispatch(createUserProfileFail(error))
        }
    }
}