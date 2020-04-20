import { getJobs, getJobsSuccess, getJobsFail, updateJob, updateJobSuccess, updateJobFail, getJobDetail, getJobDetailFail, getJobDetailSuccess } from './jobs.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const jobssMiddleware = (data) => {
    return async dispatch => {
        dispatch(getJobs())
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("latitude", data.latitude)
            formData.append("longitude", data.longitude)
            let res = await fetch(Path.GET_JOBS_FREELANCER, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("GET JOBS MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("JOBS RESPONSE", res)
                dispatch(getJobsSuccess(res.data))
                return
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
            dispatch(getJobsFail("error in getting jobs"))
        } catch (error) {
            console.log("ERROR", error)
            dispatch(getJobsFail(error))
        }
    }
}

export const updatejobMiddleWare = (data) => {
    return async dispatch => {
        dispatch(updateJob())
        try {
            console.log("DATA", data)
            if (data.type === "reject") {
                formData.append("appuid", data.appuid)
                formData.append("language", "en")
                formData.append("token", data.token)
                formData.append("booking_id", data.booking_id)
                formData.append("status", data.status)
                formData.append("reason", data.reason)
                formData.append("comment", data.comment)
            }
            if (data.type === "accept") {
                formData.append("appuid", data.appuid)
                formData.append("language", "en")
                formData.append("token", data.token)
                formData.append("booking_id", data.booking_id)
                formData.append("status", data.status)
            }
            let res = await fetch(Path.UPDATE_JOBS_FREELANCER, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("Update JOBS MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("JOBS RESPONSE", res)
                dispatch(updateJobSuccess(res.data))
                return
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
            dispatch(updateJobFail("error in updating jobs"))
        } catch (error) {
            console.log(" JOBS ERROR", error)
            dispatch(updateJobFail(error))
        }
    }
}

export const jobsDetailsMiddleware = (data) => {
    return async dispatch => {
        dispatch(getJobDetail())
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("booking_id", data.booking_id)
            let res = await fetch(Path.GET_JOBS_DETAILS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("GET JOB DETAIL MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("JOB DETAIL RESPONSE", res)
                dispatch(getJobDetailSuccess(res.data))
                return
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
            dispatch(getJobDetailFail("error in getting job detail"))
        } catch (error) {
            console.log("ERROR", error)
            dispatch(getJobDetailFail(error))
        }
    }
}