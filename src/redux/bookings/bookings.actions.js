import { bookingsActionTypes } from './bookings.actions.types'

export const getBookings = payload => ({
    type: bookingsActionTypes.GET_BOOKINGS,
    payload
})

export const getBookingsSuccess = payload => ({
    type: bookingsActionTypes.GET_BOOKINGS_SUCCESS,
    bookings: payload
})

export const getBookingsFail = payload => ({
    type: bookingsActionTypes.GET_BOOKINGS_FAIL,
    payload
})