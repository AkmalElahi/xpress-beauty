import { getTools, getToolsSuccess, getToolsFail } from './tools.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const toolsMiddleware =  ({token, appuid}) => {
    return  async dispatch=>{
        dispatch(getTools())
           try {
               formData.append("appuid", appuid )
               formData.append("language", "en")
               formData.append("token", token)
             let res = await fetch(Path.GET_TOOLS, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("TOOLS MIDDLEWARE", res)
            if(res.message === "success"){
                // console.log("TOOLS RESPONSE", res)
                dispatch(getToolsSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getToolsFail(error))
           }
    }
}