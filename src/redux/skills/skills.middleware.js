import { getTools, getToolsSuccess, getToolsFail } from './skills.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const skillsMiddleware =  ({token, appuid}) => {
    return  async dispatch=>{
        dispatch(getTools())
           try {
               formData.append("appuid", appuid )
               formData.append("language", "en")
               formData.append("token", token)
             let res = await fetch(Path.GET_SKILLS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                // console.log("SKILLS RESPONSE", res)
                dispatch(getToolsSuccess(res.data))
            }
            else{
               dispatch(getToolsFail("error in gettiing skills"))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getToolsFail(error))
           }
    }
}