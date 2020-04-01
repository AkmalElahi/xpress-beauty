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