import { getAllNotifications, getAllNotificationsSuccess, getAllNotificationsFail } from './notifications.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const notificationsMiddleware =  ({ appuid, token}) => {
    return  async dispatch=>{
        dispatch(getAllNotifications())
           try {
               formData.append("appuid", appuid )
               formData.append("language", "en")
               formData.append("token", token)
               console.log("FORM DATA", formData)
             let res = await fetch(Path.GET_NOTIFICATIONS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("NOTIFICATIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("NOTIFICATIONS", res)
                dispatch(getAllNotificationsSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR IN NOTIFICATIONS" , error)
               dispatch(getAllNotificationsFail(error))
           }
    }
}