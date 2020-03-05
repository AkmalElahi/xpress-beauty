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