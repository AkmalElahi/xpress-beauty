import { cartActionTypes } from './cart.action-types'

export const addServiceToCart = payload =>({
    type: cartActionTypes.ADD_SERVICE_CART,
    payload
})

export const removeServiceFromCart = payload => ({
    type: cartActionTypes.REMOVE_SERVICE_CART,
    payload
})

export const checkoutCart = payload => ({
    type: cartActionTypes.CHECKOUT_ORDER,
    payload
})

export const checkoutCartSuccess = payload => ({
    type: cartActionTypes.CHECKOUT_ORDER_SUCCESS,
    payload
})

export const checkoutCartFail = payload => ({
    type: cartActionTypes.CHECKOUT_ORDER_FAIL,
    payload
})