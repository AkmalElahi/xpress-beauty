import { userActionTypes } from './user.actionTypes'


export const setUserType = payload => ({
    type: userActionTypes.SET_USER_TYPE,
    payload
})

export const getCurrentUser = () => ({
    type: userActionTypes.GET_CURRENT_USER,
})

export const setUserMobile = payload => ({
    type: userActionTypes.SET_USER_MOBILE,
    payload
})

export const setUserProfile = payload => ({
    type: userActionTypes.SET_USER_PROFILE,
    payload
})
export const setFreelancerProfile = payload => ({
    type: userActionTypes.SET_FREELANCER_PROFILE,
    payload
})
export const createUserProfile = payload => ({
    type: userActionTypes.CREATE_USER_PROFILE,
    payload
})

export const createUserProfileSuccess = payload => ({
    type: userActionTypes.CREATE_USER_PROFILE_SUCCESS,
    payload
})

export const createUserProfileFail = payload => ({
    type: userActionTypes.CREATE_USER_PROFILE_FAIL,
    payload
})

export const checkStatus = payload => ({
    type: userActionTypes.CHECK_STATUS,
    payload
})

export const checkStatusSuccess = payload => ({
    type: userActionTypes.CHECK_STATUS_SUCCESS,
    payload
})

export const checkStatusFail = payload => ({
    type: userActionTypes.CHECK_STATUS_FAIL,
    payload
})

export const setFreelancerStatus = payload => ({
    type: userActionTypes.SET_FRELLANCER_STATUS,
    payload
})

export const setFreelancerStatusSuccess = payload => ({
    type: userActionTypes.SET_FRELLANCER_STATUS_SUCCESS,
    payload
})

export const setFreelancerStatusFail = payload => ({
    type: userActionTypes.SET_FRELLANCER_STATUS_FAIL,
    payload
})

export const updateFreelancerProfile = payload => ({
    type: userActionTypes.UPDATE_FREELANCER_PROFILE,
    payload
})

export const updateFreelancerProfileSuccess = payload => ({
    type: userActionTypes.UPDATE_FREELANCER_PROFILE_SUCCESS,
    payload
})

export const updateFreelancerProfileFail = payload => ({
    type: userActionTypes.UPDATE_FREELANCER_PROFILE_FAIL,
    payload
})

export const uploadProfileImage = payload => ({
    type: userActionTypes.UPLOAD_PROFILE_IMAGE,
    payload
})

export const uploadProfileImageSuccess = payload => ({
    type: userActionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS,
    payload
})

export const uploadProfileImageFail = payload => ({
    type: userActionTypes.UPLOAD_PROFILE_IMAGE_FAIL,
    payload
})

export const logout = () => ({
    type: userActionTypes.LOGOUT
})