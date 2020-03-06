import { userActionTypes } from './user.actionTypes'

const INITIAL_STATE = {
    user_type: "",
    mobile: "",
    appuid:"",
    username:"",
    email:"",
    dob:"",
    address:{}
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER_TYPE:
            return {
                ...state,
                user_type: action.payload
            }
        case userActionTypes.SET_USER_MOBILE:
            return {
                ...state,
                mobile: action.payload.mobile,
                appuid:action.payload.appuid
            }
        case userActionTypes.SET_USER_PROFILE:
            return {
                ...state,
                username: action.payload.username,
                dob: action.payload.dob,
                email: action.payload.email
            }
        case userActionTypes.GET_CURRENT_USER:
            return {
                ...state
            }
        default:
            return state
    }
}

export default userReducer