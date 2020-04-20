import { getPromotions, getPromotionsSuccess, getPromotionsFail } from './promotions.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const promotionsMiddleware =  () => {
    return  async dispatch=>{
        dispatch(getPromotions())
           try {
            //    formData.append("appuid", appuid )
               formData.append("language", "en")
            //    formData.append("token", token)
             let res = await fetch(Path.GET_PROMOTIONS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                // console.log("RESPONSE", res)
                dispatch(getPromotionsSuccess(res.data))
            }
            else{
               dispatch(getPromotionsFail("error in getiing promotions"))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getPromotionsFail(error))
           }
    }
}