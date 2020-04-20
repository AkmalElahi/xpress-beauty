import { getGallery, getGallerySuccess, getGalleryFail, uploadGalleryImage, uploadGalleryImageSuccess, uploadGalleryImageFail } from './gallery.actions'
import Path from '../../configs/path'
const formData = new FormData()

export const getGalleryMiddleware = (data) => {
    return async dispatch => {
        dispatch(getGallery())
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            let res = await fetch(Path.GET_GALLERY_IMAGE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("GET GALLEY MIDDLEWARE MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                dispatch(getGallerySuccess(res.data))
            }
            else {
                dispatch(uploadGalleryImageFail("error in getting images "))

            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(getGalleryFail(error))
        }
    }
}

export const uploadGalleryMiddleware = (data) => {
    return async dispatch => {
        dispatch(uploadGalleryImage(data))
        console.log("DATA IN UPLOAD GALLERY", data)
        try {
            formData.append("appuid", data.appuid)
            formData.append("language", "en")
            formData.append("token", data.token)
            formData.append("image", data.image)
            let res = await fetch(Path.UPLOAD_GALLERY_IMAGE, {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            })
            res = await res.json()
            console.log("GALLERY MIDDLEWARE", res)
            if (res.message === "success") {
                console.log("RESPONSE", res)
                dispatch(uploadGalleryImageSuccess(res.data))
            }
            else {
                dispatch(uploadGalleryImageFail("error in uploading image"))
            }
        } catch (error) {
            console.log("ERROR", error)
            dispatch(uploadGalleryImageFail(error))
        }
    }
}