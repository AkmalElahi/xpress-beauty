import { cartActionTypes } from "./cart.action-types";
import { addService } from "./cart.utils";

const INITIAL_STATE = {
    services: []
}

export default cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.ADD_SERVICE_CART:
            return {
                ...state,
                services: addService(state.services, action.payload)
            }
        default:
            return state
    }
}