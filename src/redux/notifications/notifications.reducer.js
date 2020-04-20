import { notificationsActionTypes } from './notifications.actions.types'
const INITIAL_STATE = {
    success: false,
    error: false,
    message: "",
    notifications: []
}
const notificationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case notificationsActionTypes.GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                message: "request for notifications"
            }
        case notificationsActionTypes.GET_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                message: "notifications found",
                success: true,
                error: false,
                notifications: action.notifications
            }
        case notificationsActionTypes.GET_ALL_NOTIFICATIONS_FAIL:
            return {
                ...state,
                message: "error in getting notifications",
                success: false,
                error: true
            }
        case notificationsActionTypes.UPDATE_NOTIFICATIONS:
            return {
                ...state,
                message: "update notifications",
                success: false,
                error: false
            }
        case notificationsActionTypes.UPDATE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                message: "update notifications succcess",
                success: true,
                error: false
            }
        case notificationsActionTypes.UPDATE_NOTIFICATIONS_FAIL:
            return {
                ...state,
                message: "error in updating notifications",
                success: false,
                error: true
            }
        default:
            return {
                ...state
            }
    }
}

export default notificationsReducer