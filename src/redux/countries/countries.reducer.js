import { CountriesActionTypes } from './countries.types'

const INITIAL_STATE = {
    success: false,
    countries: [],
    error: false
}

const countriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CountriesActionTypes.GET_COUNTRIES:
            return {
                ...state,
                success:false,
                error:false
            }
        case CountriesActionTypes.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                countries: action.payload
            }
        case CountriesActionTypes.GET_COUNTRIES_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: action.payload
            }
        default:
            return state
    }
}

export default countriesReducer