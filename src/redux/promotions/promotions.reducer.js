import { PromotionsActionTypes } from './promotions.types'

const INITIAL_STATE = {
    success: false,
    promotions: null,
    error: false,
    message:""
}

const promotionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PromotionsActionTypes.GET_PROMOTIONS:
            return {
                ...state,
                success:false,
                error:false,
                message:"get promotions request"
            }
        case PromotionsActionTypes.GET_PROMOTIONS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                promotions: action.payload,
                message:"promotions fount successfully"
            }
        case PromotionsActionTypes.GET_PROMOTIONS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting promotions"
            }
        default:
            return state
    }
}

export default promotionsReducer