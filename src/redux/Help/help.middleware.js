import Path from '../../configs/path'
import { getFAQs, getFAQsSuccess, getFAQsFail, getFAQDetailsSuccess } from './help.actions'

export const getFaqsMiddleware = ({ appuid, token }) => {
    return async dispatch => {
        const formData = new FormData()
        dispatch(getFAQs())
        try {
            formData.append("appuid", appuid)
            formData.append("language", "en")
            formData.append("token", token)
            console.log("FORM DATA", formData)
            let res = await fetch(Path.GET_FAQS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("FAQs MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("FAQs", res)
                dispatch(getFAQsSuccess(res.data))
            }
            else {
                dispatch(getFAQsFail("error in getting notifications"))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
        } catch (error) {
            console.log("ERROR IN FAQs", error)
            dispatch(getFAQsFail(error))
        }
    }
}

export const faqDetailsMiddleware = ({ appuid, token, question_id }) => {
    return async dispatch => {
        const formData = new FormData()
        dispatch(getFAQs({ appuid, token }))
        try {
               formData.append("appuid", appuid )
               formData.append("language", "en")
               formData.append("token", token)
               formData.append("question_id", question_id)
            console.log("FORM DATA", formData)
            let res = await fetch(Path.GET_FAQS_DETAILS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("GET FAQS RES MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("GET FAQS RES", res.data.detail)
                dispatch(getFAQDetailsSuccess(res.data[0].detail))
            }
            else {
                dispatch(getFAQsFail("error in gettting faq details"))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
        } catch (error) {
            console.log("ERROR IN NOTIFICATIONS UPDATE", error)
            dispatch(getFAQsFail(error))
        }
    }
}