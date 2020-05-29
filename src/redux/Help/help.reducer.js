import { helpActionTypes } from './help.actions.types'
const INITIAL_STATE = {
    success: false,
    error: false,
    message: "",
    faqs: [],
    faqDetails: "",
    loading: false
}
const helpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case helpActionTypes.GET_FAQS:
            return {
                ...state,
                loading: true,
                message: "request for faqs"
            }
        case helpActionTypes.GET_FAQS_SUCCESS:
            return {
                ...state,
                message: "faqs found",
                success: true,
                error: false,
                faqs: action.faqs,
                loading: false
            }
        case helpActionTypes.GET_FAQS_FAIL:
            return {
                ...state,
                message: "error in getting faqs",
                success: false,
                error: true,
                loading: false

            }
        case helpActionTypes.GET_FAQ_DETAILS_SUCCESS:
            return {
                ...state,
                message: "faq details found",
                success: true,
                error: false,
                faqDetails: action.faqDetails,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}

export default helpReducer