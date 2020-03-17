import { getBookings, getBookingsSuccess, getBookingsFail } from './bookings.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const bookingsMiddleware =  (data) => {
    return  async dispatch=>{
        dispatch(getBookings())
           try {
               formData.append("appuid", data.appuid )
               formData.append("language", "en")
               formData.append("token", data.token)
             let res = await fetch(Path.GET_BOOKINGS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("BOOKINGS RESPONSE", res)
                dispatch(getBookingsSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getBookingsFail(error))
           }
    }
}