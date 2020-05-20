import { userActionTypes } from './user.actionTypes'

const INITIAL_STATE = {
    isloading: false,
    user_type: "",
    mobile: "",
    appuid: "",
    username: "",
    email: "",
    dob: "",
    token: "",
    building: "",
    street: "",
    area: "",
    city: "",
    cnic: "",
    house: "",
    address_note: "",
    isProfileComplete: false,
    success: false,
    error: false,
    status: "",
    is_approved: "0",
    isActive: true,
    freelancerSkills: {},
    freelancerTools: {},
    freelancerTraining: "",
    profile_image:null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER_TYPE:
            return {
                ...state,
                user_type: action.payload,
                success: false,
                error: false,
                isloading: false,
            }
        case userActionTypes.SET_USER_MOBILE:
            return {
                ...state,
                mobile: action.payload.mobile,
                appuid: action.payload.appuid,
                token: action.payload.token,
                isloading: false,
            }
        case userActionTypes.SET_USER_PROFILE:
            return {
                ...state,
                username: action.payload.username,
                dob: action.payload.dob,
                email: action.payload.email,
                isloading: false,
                profile_image:action.payload.image ? action.payload.image : state.profile_image,
                message: ""
            }
        case userActionTypes.SET_FREELANCER_PROFILE:
            console.log("USER IN REDUCER", action.payload)
            return {
                ...state,
                building: action.payload.building,
                street: action.payload.street,
                area: action.payload.area,
                city: action.payload.city,
                cnic: action.payload.cnic,
                house: action.payload.house,
                username: action.payload.username,
                dob: action.payload.dob,
                email: action.payload.email,
                freelancerSkills: action.payload.skills,
                freelancerTools: action.payload.tools,
                freelancerTraining: action.payload.training,
                isloading: false,
                profile_image:action.payload.image ? action.payload.image : state.profile_image,
                message: "set freelancer profile"
            }
        case userActionTypes.CREATE_USER_PROFILE:
            return {
                ...state,
                building: action.payload.building,
                street: action.payload.street,
                area: action.payload.area,
                city: action.payload.city,
                house: action.payload.house,
                address_note: action.payload.address_note,
                message: "set user request",
                isloading: true,
            }
        case userActionTypes.CREATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                message: "user profile created successfully",
                isProfileComplete: true,
                isloading: false,
            }
        case userActionTypes.CREATE_USER_PROFILE_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in creating user profile",
                isProfileComplete: false,
                isloading: false,
            }

        case userActionTypes.CHECK_STATUS:
            return {
                ...state,
                message: "check freelancer status request",
                isloading: true
            }
        case userActionTypes.CHECK_STATUS_SUCCESS:
            return {
                ...state,
                message: "check freelancer status success",
                isloading: false,
                status: action.payload.status,
                is_approved: action.payload.is_approved
            }
        case userActionTypes.CHECK_STATUS_FAIL:
            return {
                ...state,
                message: "check freelancer status false",
                isloading: false,
                status: null,
                is_approved: "0"
            }
        case userActionTypes.SET_FRELLANCER_STATUS:
            return {
                ...state,
                message: "set freelnacer status request",
                isloading: true
            }
        case userActionTypes.SET_FRELLANCER_STATUS_SUCCESS:
            return {
                ...state,
                message: "freelancer status updated successfully",
                isloading: false,
                isActive: action.payload
            }
        case userActionTypes.SET_FRELLANCER_STATUS_SUCCESS:
            return {
                ...state,
                message: "error in updating freelancer status",
                isloading: false
            }
        case userActionTypes.GET_CURRENT_USER:
            return {
                ...state,
            }
        case userActionTypes.UPDATE_FREELANCER_PROFILE:
            return {
                ...state,
                message: "update freelancer profile request",
                isloading: true
            }
        case userActionTypes.UPDATE_FREELANCER_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                message: "update freelancer profile success",
                isloading: false,
            }
        case userActionTypes.UPDATE_FREELANCER_PROFILE_FAIL:
            return {
                ...state,
                message: "update freelancer profile false",
                isloading: false
            }
        case userActionTypes.UPLOAD_PROFILE_IMAGE:
            return {
                ...state,
                message: "upload profile image request",
                isloading: true
            }
        case userActionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                profile_image:action.payload,
                message: "upload profile image success",
                isloading: false,
            }
        case userActionTypes.UPLOAD_PROFILE_IMAGE_FAIL:
            return {
                ...state,
                message: "upload profile image false",
                isloading: false
            }
        case userActionTypes.LOGOUT:
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}

export default userReducer