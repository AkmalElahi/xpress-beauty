import { PromotionsActionTypes } from './promotions.types'

const INITIAL_STATE = {
    success: false,
    promotions: null,
    error: false
}

const promotionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PromotionsActionTypes.GET_PROMOTIONS:
            return {
                ...state,
                success:false,
                error:false
            }
        case PromotionsActionTypes.GET_PROMOTIONS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                promotions: action.payload
            }
        case PromotionsActionTypes.GET_PROMOTIONS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: action.payload
            }
        default:
            return state
    }
}

export default promotionsReducer