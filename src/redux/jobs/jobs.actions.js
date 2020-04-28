import { jobsActionTypes } from './jobs.types'

export const getJobs = payload => ({
    type: jobsActionTypes.GET_JOBS,
    payload
    
})
export const getJobsSuccess = payload => ({
    type: jobsActionTypes.GET_JOBS_SUCCESS,
    payload
    
})
export const getJobsFail = payload => ({
    type: jobsActionTypes.GET_JOBS_FAIL,
    payload
    
})

export const updateJob = payload => ({
    type: jobsActionTypes.UPDATE_JOB,
    payload
    
})
export const updateJobSuccess = payload => ({
    type: jobsActionTypes.UPDATE_JOB_SUCCESS,
    payload
    
})
export const updateJobFail = payload => ({
    type: jobsActionTypes.UPDATE_JOB_FAIL,
    payload
    
})

export const rejectJob = payload => ({
    type: jobsActionTypes.REJECT_JOB,
    payload
    
})
export const rejectJobSuccess = payload => ({
    type: jobsActionTypes.REJECT_JOB_SUCCESS,
    payload
    
})
export const rejectJobFail = payload => ({
    type: jobsActionTypes.REJECT_JOB_FAIL,
    payload
    
})
export const getJobDetail = payload => ({
    type: jobsActionTypes.GET_JOB_DETAIL,
    payload
    
})
export const getJobDetailSuccess = payload => ({
    type: jobsActionTypes.GET_JOB_DETAIL_SUCCESS,
    payload
    
})
export const getJobDetailFail = payload => ({
    type: jobsActionTypes.GET_JOB_DETAIL_FAIL,
    payload
    
})

export const jobCancel = payload => ({
    type: jobsActionTypes.JOB_CANCEL,
    payload
    
})
export const jobCancelSuccess = payload => ({
    type: jobsActionTypes.JOB_CANCEL_SUCCESS,
    payload
    
})
export const jobCancelFail = payload => ({
    type: jobsActionTypes.JOB_CANCEL_FAIL,
    payload
    
})

export const jobRating = payload => ({
    type: jobsActionTypes.JOB_RATING,
    payload
    
})
export const jobRatingSuccess = payload => ({
    type: jobsActionTypes.JOB_RATING_SUCCESS,
    payload
    
})
export const jobRatingFail = payload => ({
    type: jobsActionTypes.JOB_RATING_FAIL,
    payload
    
})