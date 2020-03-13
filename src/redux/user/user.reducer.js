import { userActionTypes } from './user.actionTypes'

const INITIAL_STATE = {
    user_type: "",
    mobile: "",
    appuid: "",
    username: "",
    email: "",
    dob: "",
    token: "",
    building:"",
    street:"",
    area:"",
    city:"",
    house:"",
    address_note:"",
    isProfileComplete:false,
    success:false,
    error:false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER_TYPE:
            return {
                ...state,
                user_type: action.payload,
                success:false,
                error:false
            }
        case userActionTypes.SET_USER_MOBILE:
            return {
                ...state,
                mobile: action.payload.mobile,
                appuid: action.payload.appuid,
                token: action.payload.token
            }
        case userActionTypes.SET_USER_PROFILE:
            return {
                ...state,
                username: action.payload.username,
                dob: action.payload.dob,
                email: action.payload.email,
            }
        case userActionTypes.CREATE_USER_PROFILE:
            return {
                ...state,
                building: action.payload.building,
                street: action.payload.street,
                area: action.payload.area,
                city: action.payload.city,
                house: action.payload.house,
                address_note: action.payload.address_note
            }
        case userActionTypes.CREATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: action.payload,
                isProfileComplete:true
            }
        case userActionTypes.CREATE_USER_PROFILE_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: action.payload,
                isProfileComplete:false
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