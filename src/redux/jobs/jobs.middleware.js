import { getJobs, getJobsSuccess, getJobsFail, updateJob, updateJobSuccess, updateJobFail, getJobDetail, getJobDetailFail, getJobDetailSuccess, jobCancel, jobCancelSuccess, jobCancelFail, jobRating, jobRatingSuccess, jobRatingFail } from './jobs.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const jobssMiddleware = (data) => {
    return async dispatch => {
        console.log("DATA IN GET JOBS FREELANCER ======>" ,data)
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
            }
            else {
                dispatch(getJobsFail("error in getting jobs"))
            }
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
            if (data.type === "accept" || data.type === "complete") {
                formData.append("appuid", data.appuid)
                formData.append("language", "en")
                formData.append("token", data.token)
                formData.append("booking_id", data.booking_id)
                formData.append("status", data.status)
            }
            if (data.type === "checkin") {
                formData.append("appuid", data.appuid)
                formData.append("language", "en")
                formData.append("token", data.token)
                formData.append("booking_id", data.booking_id)
                formData.append("status", data.status)
                formData.append("latitude", data.latitude)
                formData.append("longitude", data.longitude)
                // formData.append("latitude", "37.422558752425985")
                // formData.append("longitude", "-122.08395777270196")
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
            }
            else {
                dispatch(updateJobFail({errorMessage:res.message}))
            }
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
            formData.append("type", data.user_type)
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
            }
            else {
                dispatch(getJobDetailFail("error in getting job detail"))
            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(getJobDetailFail(error))
        }
    }
}

export const cancelJobMiddleware = (data) => {
    return async dispatch => {
        dispatch(jobCancel())
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("booking_id", data.booking_id)
            formData.append("status", data.status)
            formData.append("reason", data.reason)
            formData.append("comment", data.comments)
            let res = await fetch(Path.UPDATE_JOBS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("CANCEL JOB  MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("CANCEL JOB  RESPONSE", res)
                dispatch(jobCancelSuccess(res.data))
            }
            else {
                dispatch(jobCancelFail({errorMessage:res.message}))
            }

        } catch (error) {
            console.log("ERROR", error)
            dispatch(jobCancelFail(error))
        }
    }
}

export const rateJobMiddleware = (data) => {
    return async dispatch => {
        dispatch(jobRating())
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("booking_id", data.booking_id)
            formData.append("rating", data.rating)
            formData.append("type", data.user_type)
            formData.append("comment", data.comments)
            let res = await fetch(Path.SET_RATING, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("RAT JOB  MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RAT JOB  RESPONSE", res)
                dispatch(jobRatingSuccess(res.data))
            }
            else {
                dispatch(jobRatingFail("error in rate job "))
            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(jobCancelFail(error))
        }
    }
}