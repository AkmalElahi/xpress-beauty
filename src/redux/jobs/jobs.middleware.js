import { getJobs, getJobsSuccess, getJobsFail } from './jobs.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const jobssMiddleware =  (data) => {
    return  async dispatch=>{
        dispatch(getJobs())
           try {
               formData.append("appuid", data.appuid )
               formData.append("language", "en")
               formData.append("token", data.token)
               formData.append("latitude", data.latitude)
               formData.append("longitude", data.longitude)
             let res = await fetch(Path.GET_JOBS_FREELANCER, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            // console.log("PROMOTIONS MIDDLEWARE", res)
            if(res.message === "success"){
                console.log("JOBS RESPONSE", res)
                dispatch(getJobsSuccess(res.data))
            }
            // .then(res => res.json())
            // .then(res => console.log("Responce", res))
           } catch (error) {
               console.log("ERROR", error)
               dispatch(getJobsFail(error))
           }
    }
}