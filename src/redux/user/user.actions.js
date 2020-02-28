import { userActionTypes } from './user.actionTypes'


export const setUserType = payload => ({
    type: userActionTypes.SET_USER_TYPE,
    payload
})

export const getCurrentUser = () => ({
    type: userActionTypes.GET_CURRENT_USER,
})