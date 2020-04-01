import { jobsActionTypes } from './jobs.types'

const INITIAL_STATE = {
    success: false,
    jobs: null,
    error: false,
    message:""
}

const jobsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case jobsActionTypes.GET_JOBS:
            return {
                ...state,
                success:false,
                error:false,
                message:"get jobs request"
            }
        case jobsActionTypes.GET_JOBS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                jobs: action.payload,
                message:"jobs found successfully"
            }
        case jobsActionTypes.GET_JOBS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting jobs"
            }
        default:
            return state
    }
}

export default jobsReducer