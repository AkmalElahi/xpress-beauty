import { CountriesActionTypes } from './countries.types'

const INITIAL_STATE = {
    success: false,
    countries: [],
    error: false,
    message:""
}

const countriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CountriesActionTypes.GET_COUNTRIES:
            return {
                ...state,
                success:false,
                error:false,
                message:"get countries request"
            }
        case CountriesActionTypes.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                countries: action.payload,
                message:"countries found successfully"
            }
        case CountriesActionTypes.GET_COUNTRIES_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message:"error in getiing countries"
            }
        default:
            return state
    }
}

export default countriesReducer