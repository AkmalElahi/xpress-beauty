import { CountriesActionTypes } from './countries.types'

export const getCountries = payload => ({
    type: CountriesActionTypes.GET_COUNTRIES,
    payload
    
})
export const getCountriesSuccess = payload => ({
    type: CountriesActionTypes.GET_COUNTRIES_SUCCESS,
    payload
    
})
export const getCountriesFail = payload => ({
    type: CountriesActionTypes.GET_COUNTRIES_FAIL,
    payload
    
})