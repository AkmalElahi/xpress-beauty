import { notificationsActionTypes } from './notifications.actions.types'

export const getAllNotifications = payload => ({
    type: notificationsActionTypes.GET_ALL_NOTIFICATIONS,
    payload
})

export const getAllNotificationsSuccess = payload => ({
    type: notificationsActionTypes.GET_ALL_NOTIFICATIONS_SUCCESS,
    notifications: payload
})

export const getAllNotificationsFail = payload => ({
    type: notificationsActionTypes.GET_ALL_NOTIFICATIONS_FAIL,
    payload
})