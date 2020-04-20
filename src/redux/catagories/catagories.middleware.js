import { getCatagories, getCatagoriesSuccess, getCatagoriesFail } from './catagories.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const catagoriesMiddleware =  ({ appuid, token}) => {
    return  async dispatch=>{
        dispatch(getCatagories(token))
           try {
               formData.append("appuid", appuid )
               formData.append("language", "en")
               formData.append("token", token)
             let res = await fetch(Path.GET_ALL_CATAGORIES, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("CATAGORIES", res)
                dispatch(getCatagoriesSuccess(res.data))
            }
            else{
               dispatch(getCatagoriesFail("error in getting catagories"))

            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getCatagoriesFail(error))
           }
    }
}