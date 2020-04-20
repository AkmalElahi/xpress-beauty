import { galleyActionTypes } from './galley.types'

export const getGallery = payload => ({
    type: galleyActionTypes.GET_GALLERY,
    payload
    
})
export const getGallerySuccess = payload => ({
    type: galleyActionTypes.GET_GALLERY_SUCCESS,
    payload
    
})
export const getGalleryFail = payload => ({
    type: galleyActionTypes.GET_GALLERY_FAIL,
    payload
    
})

export const uploadGalleryImage = payload => ({
    type: galleyActionTypes.UPLOAD_GALLERY_IMAGE,
    payload
    
})
export const uploadGalleryImageSuccess = payload => ({
    type: galleyActionTypes.UPLOAD_GALLERY_IMAGE_SUCCESS,
    payload
    
})
export const uploadGalleryImageFail = payload => ({
    type: galleyActionTypes.UPLOAD_GALLERY_IMAGE_FAIL,
    payload
    
})