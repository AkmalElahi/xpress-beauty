import { helpActionTypes } from './help.actions.types'

export const getFAQs = payload => ({
    type: helpActionTypes.GET_FAQS,
    payload
})

export const getFAQsSuccess = payload => ({
    type: helpActionTypes.GET_FAQS_SUCCESS,
    faqs: payload
})

export const getFAQsFail = payload => ({
    type: helpActionTypes.GET_FAQS_FAIL,
    payload
})

export const getFAQDetailsSuccess = payload => ({
    type: helpActionTypes.GET_FAQ_DETAILS_SUCCESS,
    faqDetails: payload
})