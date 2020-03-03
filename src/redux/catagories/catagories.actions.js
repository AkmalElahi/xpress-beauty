import { catagoriesActionType } from './catagories.types'

export const getCatagories = payload => ({
    type: catagoriesActionType.GET_CATAGORIES,
    payload
    
})
export const getCatagoriesSuccess = payload => ({
    type: catagoriesActionType.GET_CATAGORIES_SUCCESS,
    payload
})
export const getCatagoriesFail = payload => ({
    type: catagoriesActionType.GET_CATAGORIES_FAIL,
    payload
    
})