import { getBeauticians, getBeauticiansSuccess, getBeauticiansFail } from './beautician.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const beauticianMiddleware = (data) => {
    return  async dispatch=>{
        dispatch(getBeauticians(data))
           try {
               formData.append("appuid", data.appuid )
               formData.append("language", "en")
               formData.append("token", data.token)
             let res = await fetch(Path.GET_BEAUTICIANS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("RESPONSE IN BEAUTICIANS", res)
                dispatch(getBeauticiansSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getBeauticiansFail(error))
           }
    }
}