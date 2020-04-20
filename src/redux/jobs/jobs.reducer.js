import { jobsActionTypes } from './jobs.types'

const INITIAL_STATE = {
    success: false,
    jobs: null,
    error: false,
    message: "",
    loading: false,
    details:null
}

const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case jobsActionTypes.GET_JOBS:
            return {
                ...state,
                success: false,
                error: false,
                message: "get jobs request",
                loading: true
            }
        case jobsActionTypes.GET_JOBS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                jobs: action.payload,
                message: "jobs found successfully",
                loading: false
            }
        case jobsActionTypes.GET_JOBS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting jobs",
                loading: false
            }
        case jobsActionTypes.UPDATE_JOB:
            return {
                ...state,
                success: false,
                error: false,
                message: "update job request",
                loading: true
            }
        case jobsActionTypes.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: "update job success",
                loading: false
            }
        case jobsActionTypes.UPDATE_JOB_FAIL:
            return {
                ...state,
                success: false,
                error: false,
                message: "update job fail",
                loading: false
            }
        case jobsActionTypes.GET_JOB_DETAIL:
            return {
                ...state,
                success: false,
                error: false,
                message: "get job detail request",
                loading: true
            }
        case jobsActionTypes.GET_JOB_DETAIL_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                details:action.payload,
                message: "job details found successfully",
                loading: false
            }
        case jobsActionTypes.GET_JOB_DETAIL_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting job detail",
                loading: false
            }
        default:
            return state
    }
}

export default jobsReducer