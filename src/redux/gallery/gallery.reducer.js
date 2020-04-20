import { galleyActionTypes } from './galley.types'

const INITIAL_STATE = {
    success: false,
    gallery: null,
    error: false,
    message: "",
    loading: false
}

const galleryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case galleyActionTypes.GET_GALLERY:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: "get gallery request"
            }
        case galleyActionTypes.GET_GALLERY_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                gallery: action.payload,
                message: "gallery found successfully",
                loading: false

            }
        case galleyActionTypes.GET_GALLERY_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting gallery",
                loading: false

            }
        case galleyActionTypes.UPLOAD_GALLERY_IMAGE:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
                message: "upload gallery image request"
            }
        case galleyActionTypes.UPLOAD_GALLERY_IMAGE_SUCCESS:
            return {
                ...state,
                success: false,
                error: false,
                message: "upload gallery image success",
                loading: false

            }
        case galleyActionTypes.UPLOAD_GALLERY_IMAGE_FAIL:
            return {
                ...state,
                success: false,
                error: false,
                message: "upload gallery image fail",
                loading: false

            }
        default:
            return state
    }
}

export default galleryReducer