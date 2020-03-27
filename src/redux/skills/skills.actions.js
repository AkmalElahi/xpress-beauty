import { skillsActionTypes } from './skills.actionTypes'

export const getTools = payload => ({
    type: skillsActionTypes.GET_SKILLS,
    payload
    
})
export const getToolsSuccess = payload => ({
    type: skillsActionTypes.GET_SKILLS_SUCCESS,
    payload
    
})
export const getToolsFail = payload => ({
    type: skillsActionTypes.GET_SKILLS_FAIL,
    payload
    
})