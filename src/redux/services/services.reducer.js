import { ServicesActionType } from './services.types'

const INITIAL_STATE = {
    services:  [
        {
            id: 1,
            heading: "Clasical Facial",
            duration: "80 min"
        },
        {
            id: 2,
            heading: "Herbal Facial",
            duration: "60 min"
        },
        {
            id: 3,
            heading: "Cleansing",
            duration: "20 min"
        },
        {
            id: 4,
            heading: "Clasical Facial",
            duration: "80 min"
        },
        {
            id: 5,
            heading: "Herbal Facial",
            duration: "60 min"
        },
        {
            id: 6,
            heading: "Cleansing",
            duration: "20 min"
        }
    ]
}

const servicesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default servicesReducer