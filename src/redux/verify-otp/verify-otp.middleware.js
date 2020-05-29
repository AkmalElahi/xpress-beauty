import { verifyOtp, verifyOtpSuccess, verifyOtpFail, verifyNewOtpSuccess } from './verify-otp.actions'
import { setUserProfile, setFreelancerProfile } from '../user/user.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const VerifyOtpMiddleWare = ({ otp, mobile, user_type }) => {
    return async dispatch => {
        const formData = new FormData()
        dispatch(verifyOtp(mobile))
        try {
            formData.append("mobile", mobile)
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
            if (res.message === "success") {
                console.log("RESPONSE", res)
                if (res.data.user_type === "customer") {
                    console.log("USER IN OTP", res.data)
                    dispatch(setUserProfile({
                        username: res.data.username,
                        email: res.data.email,
                        dob: res.data.date_of_birth,
                        token: res.data.token,
                        appuid: res.data.appuid,
                        image: res.data.image
                    }))
                }
                if (res.data.user_type === "freelancer") {
                    console.log("USER IN OTP", res.data.image)
                    dispatch(setFreelancerProfile({
                        username: res.data.username,
                        email: res.data.email,
                        dob: res.data.date_of_birth,
                        token: res.data.token,
                        appuid: res.data.appuid,
                        building: res.data.building,
                        house: res.data.house,
                        city: res.data.city,
                        area: res.data.area,
                        street: res.data.street,
                        tools: res.data.tools,
                        skills: res.data.skills,
                        training: res.data.training,
                        cnic: res.data.cnic,
                        image: res.data.image
                    }))
                }
                dispatch(verifyOtpSuccess({
                    token: res.data.token,
                    appuid: res.data.appuid,
                    username: res.data.username,
                    email: res.data.email,
                    dob: res.data.dob,
                    message: res.message,
                    building: res.data.building,
                    house: res.data.house,
                    city: res.data.city,
                    area: res.data.area,
                    street: res.data.street,
                }))
            }
            else {
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

export const verifyOtpForNewMobileMiddleWare = (data) => {
    return async dispatch => {
        const formData = new FormData()
        dispatch(verifyOtp(data.mobile))
        try {
            formData.append("mobile", data.mobile)
            formData.append("language", "en")
            formData.append("appuid", data.appuid)
            formData.append("token", data.token)
            formData.append("otp", data.otp)

            let res = await fetch(Path.VERIFY_NEW_OTP, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("VERIFY NEW RESPONSE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                dispatch(verifyNewOtpSuccess(res.message))
            }
            else {
                dispatch(verifyOtpFail({ errMessage: res.message }))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
        } catch (error) {
            console.log("OTP ERROR", error)
            dispatch(verifyOtpFail(error))
        }
    }
}