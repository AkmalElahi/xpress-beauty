import { checkoutCart, checkoutCartSuccess, checkoutCartFail } from './cart.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const cartMiddleWare = (data) => {
    return async dispatch => {
        dispatch(checkoutCart(data))
        console.log("CART MIDDLEWARE", data)
        try {
            formData.append("language", "en")
            formData.append("appuid", data.user.appuid)
            formData.append("token", data.user.token)
            formData.append("services", JSON.stringify(data.services))
            formData.append("job_status", data.job_status)
            formData.append("appointment_datetime", data.appointment_datetime)
            formData.append("alt_appointment_datetime", data.alt_appointment_datetime)
            formData.append("payment_method", data.payment_method)
            formData.append("beautician_id", data.beautician_id)
            formData.append("building", data.address.building)
            formData.append("street", data.address.street)
            formData.append("area", data.address.area)
            formData.append("city", data.address.city)
            formData.append("house", data.address.house)
            formData.append("address_note", data.address.address_note)
            formData.append("latitude", data.address.region.latitude)
            formData.append("longitude", data.address.region.longitude)
            console.log("FORM DATA IN CHECKOUT" ,formData)
            let res = await fetch(Path.CHECKOUT, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("CHECKOUT RESPONSE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                dispatch(checkoutCartSuccess(res.message))
            }
            else {
                dispatch(checkoutCartFail(res.message))
            }
        } catch (error) {
            console.log("ERROR IN CHECKOUT ", error)
            dispatch(checkoutCartFail(error))
        }
    }
}