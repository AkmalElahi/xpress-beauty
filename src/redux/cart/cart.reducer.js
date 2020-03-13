import { cartActionTypes } from "./cart.action-types";
import { addService, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    services: [],
    success: false,
    error: false,
    order:null
}

export default cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.ADD_SERVICE_CART:
            return {
                ...state,
                success:false,
                error:false,
                services: addService(state.services, action.payload)
            }
        case cartActionTypes.REMOVE_SERVICE_CART:
            return {
                ...state,
                services: removeItemFromCart(state.services, action.payload)
            }
        case cartActionTypes.CHECKOUT_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case cartActionTypes.CHECKOUT_ORDER_SUCCESS:
            return {
                ...state,
                message:action.payload,
                success:true,
                error:false,
                order:null,
                services:[]
            }
        case cartActionTypes.CHECKOUT_ORDER_FAIL:
            return {
                ...state,
                message:action.payload,
                success:true,
                error:false,
            }
        default:
            return state
    }
}