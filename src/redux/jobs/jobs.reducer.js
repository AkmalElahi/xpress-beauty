import { jobsActionTypes } from './jobs.types'

const INITIAL_STATE = {
    success: false,
    jobs: null,
    error: false,
    message: "",
    loading: false
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
        default:
            return state
    }
}

export default jobsReducer