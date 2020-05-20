import { cartActionTypes } from "./cart.action-types";
import { addService, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    services: [],
    success: false,
    error: false,
    order:null,
    message:""
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.ADD_SERVICE_CART:
            return {
                ...state,
                success:false,
                error:false,
                message:"service added to cart",
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
                order: action.payload,
                message:"checkout request"
            }
        case cartActionTypes.CHECKOUT_ORDER_SUCCESS:
            return {
                ...state,
                message:"checkout done successfully",
                success:true,
                error:false,
                order:null,
                services:[]
            }
        case cartActionTypes.CHECKOUT_ORDER_FAIL:
            return {
                ...state,
                message:"error in checkout",
                success:false,
                error:true,
            }
        default:
            return state
    }
}

export default cartReducer