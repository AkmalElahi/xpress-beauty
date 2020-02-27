import { ServicesActionType } from './services.types'

export const getServices = payload => ({
    type: ServicesActionType.GET_SERVICES,
    services: payload
})