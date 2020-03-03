import { PromotionsActionTypes } from './promotions.types'

export const getPromotions = payload => ({
    type: PromotionsActionTypes.GET_PROMOTIONS,
    payload
    
})
export const getPromotionsSuccess = payload => ({
    type: PromotionsActionTypes.GET_PROMOTIONS_SUCCESS,
    payload
    
})
export const getPromotionsFail = payload => ({
    type: PromotionsActionTypes.GET_PROMOTIONS_FAIL,
    payload
    
})