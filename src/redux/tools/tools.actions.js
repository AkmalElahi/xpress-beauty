import { toolsActionTypes } from './tools.actionTypes'

export const getTools = payload => ({
    type: toolsActionTypes.GET_TOOLS,
    payload
    
})
export const getToolsSuccess = payload => ({
    type: toolsActionTypes.GET_TOOLS_SUCCESS,
    payload
    
})
export const getToolsFail = payload => ({
    type: toolsActionTypes.GET_TOOLS_FAIL,
    payload
    
})