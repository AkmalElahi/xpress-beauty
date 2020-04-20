import { getCountries, getCountriesSuccess, getCountriesFail } from './countries.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const countriesMiddleware =  () => {
    return  async dispatch=>{
        dispatch(getCountries())
           try {
               formData.append("language", "en")
             let res = await fetch(Path.GET_COUNTRIES, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                // console.log("RESPONSE", res)
                dispatch(getCountriesSuccess(res.data))
            }
           else{
            dispatch(getCountriesFail("error in getting countries"))
           }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getCountriesFail(error))
           }
    }
}