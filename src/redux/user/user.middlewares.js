import {
    createUserProfile, createUserProfileSuccess, createUserProfileFail, checkStatus,
    checkStatusSuccess, checkStatusFail, setFreelancerProfile, setUserProfile, updateFreelancerProfileSuccess, updateFreelancerProfile, setFreelancerStatusSuccess, setFreelancerStatusFail, setFreelancerStatus, uploadProfileImageSuccess, uploadProfileImageFail, uploadProfileImage
} from './user.actions'
import Path from '../../configs/path'
import { Platform } from 'react-native'
import { getUniqueId, getModel, getDevice } from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';

const formData = new FormData()

export const userMiddleWare = (data) => {
    return async dispatch => {
        dispatch(createUserProfile(data))
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("FOCM TOKEN IN USER REGISTER MIDDLE WARE", fcmToken)
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
                formData.append("device_id", fcmToken)
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
                formData.append("device_id", fcmToken)
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
                        dob: data.user.dob,
                        token: data.user.token,
                        appuid: data.user.appuid,
                    }))
                }
                if (data.user.user_type === 'freelancer') {
                    console.log("SETTING FREELANCER PROFILE IN MIDDLEWARE", res.data)
                    dispatch(setFreelancerProfile({
                        username: data.user.username,
                        email: data.user.email,
                        dob: data.user.dob,
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
                        cnic: data.user.cnic
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
    return async dispatch => {
        dispatch(checkStatus())
        try {
            //    console.log("DATA IN CHECK",data)
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            let res = await fetch(Path.CHECK_STATUS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("CHECK STATUS  MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RESPONSE OF CHECK", res)
                dispatch(checkStatusSuccess(res.data))
            }
            else {
                dispatch(checkStatusFail("error in checking freelancer status"))

            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
        } catch (error) {
            console.log("ERROR", error)
            dispatch(checkStatusFail(error))
        }
    }
}


export const updateFreelancerProfileMiddleware = (data) => {
    return async dispatch => {
        dispatch(updateFreelancerProfile(data))
        try {
            // const device_id = getUniqueId()
            // const model = getModel()
            // const os = Platform.Version
            // const platform = Platform.OS
            // let device = ""
            // await getDevice().then(d => divice = d)
            console.log("DATA IN MILDDLEQARE", data)
            if (data.type === 'personal') {
                formData.append("building", data.building)
                formData.append("street", data.street)
                formData.append("area", data.area)
                formData.append("city", data.city)
                formData.append("house", data.house)
                formData.append("language", "en")
                formData.append("appuid", data.appuid)
                formData.append("token", data.token)
                formData.append("username", data.username)
                formData.append("email", data.email)
                formData.append("dob", data.dob)
                formData.append("cnic", data.cnic)
            }
            if (data.type === "expertise") {
                formData.append("freelancer_skills", data.skills.toString())
                formData.append("freelancer_tools", data.tools.toString())
                formData.append("training", data.training)
                formData.append("language", "en")
                formData.append("appuid", data.appuid)
                formData.append("token", data.token)
            }
            console.log("FORM DATA", formData)
            let res = await fetch(Path.UPDATE_FREELANCER_PROFILE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("UPDATE  FREELANCER PROFILE RESPONSE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                if (data.type === "personal") {
                    console.log("UPDATING FREELANCER PROFILE IN MIDDLEWARE", res.data)
                    dispatch(updateFreelancerProfileSuccess({
                        username: data.username,
                        email: data.email,
                        dob: data.dob,
                        token: data.token,
                        appuid: data.appuid,
                        building: data.building,
                        house: data.house,
                        city: data.city,
                        area: data.area,
                        street: data.street,
                        cnic: data.cnic
                    }))
                }
                if (data.type === 'expertise') {
                    console.log("UPDATING FREELANCER PROFILE IN MIDDLEWARE", res.data)
                    dispatch(updateFreelancerProfileSuccess({
                        tools: data.tools,
                        skills: data.skills,
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

export const setFreelancerStatusMiddleware = (data) => {
    return async dispatch => {
        dispatch(setFreelancerStatus())
        try {
            //    console.log("DATA IN CHECK",data)
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("is_live", data.is_active)
            let res = await fetch(Path.SET_FREELANCER_STATUS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("SET FREELANCER STATUS MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RESPONSE OF SET FREELANCER STATUS", res)
                dispatch(setFreelancerStatusSuccess(data.is_active))
            }
            else {
                dispatch(setFreelancerStatusFail("error in updating freelancer status"))
            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(setFreelancerStatusFail(error))
        }
    }
}

export const uploadProfileImageMiddleWare = (data) => {
    return async dispatch => {
        dispatch(uploadProfileImage())
        try {
            const formData = new FormData()
            console.log("DATA IN UPLOAD IMAGE", data)
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("image", {
                // name: Math.random() + data.appuid + data.image.t,
                name:'profile_' + data.image.type,
                type: data.image.type,
                uri:
                    Platform.OS === "android" ? data.image.uri : data.image.uri.replace("file://", "")
            });
            console.log("FORMDATA IN UPLOAD IMAGE", formData._parts)
            let res = await fetch(Path.UPLOAD_PROFILE_IMAGE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("UPLOAD PROFILE IMAGE MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RESPONSE OF UPLOAD PROFILE IMAGE", res)
                dispatch(uploadProfileImageSuccess(res.data.image))
            }
            else {
                dispatch(uploadProfileImageFail("error in upploading profile image"))
            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(uploadProfileImageFail(error))
        }
    }
}