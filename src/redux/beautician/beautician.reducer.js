import { beauticianActionTypes } from './beautician.action.types'
const INITIAL_STATE = {
    success: false,
    error: false,
    beauticians: [],
    message: ""
}
const beauticianReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case beauticianActionTypes.GET_BEAUTICIANS:
            return {
                ...state,
                success: false,
                error: false,
                beauticians: [],
                message: "request get beauticians"
            }
        case beauticianActionTypes.GET_BEAUTICIANS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                beauticians:action.beauticians,
                message: "beauticians found"
            }
        case beauticianActionTypes.GET_BEAUTICIANS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                beauticians: [],
                message: "error in getting beautician"
            }

        default:
            return state
    }
}
export default beauticianReducer