import { cartActionTypes } from './cart.action-types'

export const addServiceToCart = payload =>({
    type: cartActionTypes.ADD_SERVICE_CART,
    payload
})