import { bookingsActionTypes } from './bookings.actions.types'
const INITIAL_STATE = {
    success: false,
    error: false,
    bookings: [],
    message: "",
    isloading: false
}
const bookingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case bookingsActionTypes.GET_BOOKINGS:
            return {
                ...state,
                success: false,
                error: false,
                bookings: [],
                isloading: true,
                message: "bookings request"
            }
        case bookingsActionTypes.GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                bookings: action.bookings,
                message: "bookings found",
                isloading: false

            }
        case bookingsActionTypes.GET_BOOKINGS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                bookings: [],
                message: "error in gettings bookings",
                isloading: false
            }
        default:
            return { ...state }
    }
}

export default bookingsReducer