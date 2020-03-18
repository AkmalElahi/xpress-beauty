import { catagoriesActionType } from './catagories.types'

const INITIAL_STATE = {
    categories:  [],
    success:false,
    error:false,
    message:""
}

const servicesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case catagoriesActionType.GET_CATAGORIES:
            return {
                ...state,
                success:false,
                error:false,
                message:"get categories request"
            }
        case catagoriesActionType.GET_CATAGORIES_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                categories: action.payload,
                message:"categories found"
            }
        case catagoriesActionType.GET_CATAGORIES_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting categories"
            }
        default:
            return state
    }
}

export default servicesReducer

// {
//     id: 1,
//     heading: "Clasical Facial",
//     duration: "80 min"
// },
// {
//     id: 2,
//     heading: "Herbal Facial",
//     duration: "60 min"
// },
// {
//     id: 3,
//     heading: "Cleansing",
//     duration: "20 min"
// },
// {
//     id: 4,
//     heading: "Clasical Facial",
//     duration: "80 min"
// },
// {
//     id: 5,
//     heading: "Herbal Facial",
//     duration: "60 min"
// },
// {
//     id: 6,
//     heading: "Cleansing",
//     duration: "20 min"
// }