import { beauticianActionTypes } from './beautician.action.types'

export const getBeauticians = payload => ({
    type: beauticianActionTypes.GET_BEAUTICIANS,
    payload
})

export const getBeauticiansSuccess = payload => ({
    type: beauticianActionTypes.GET_BEAUTICIANS_SUCCESS,
    beauticians: payload
})

export const getBeauticiansFail = payload => ({
    type: beauticianActionTypes.GET_BEAUTICIANS_FAIL,
    payload
})