import { skillsActionTypes } from './skills.actionTypes'

const INITIAL_STATE = {
    success: false,
    skills: null,
    error: false,
    message:""
}

const skillsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case skillsActionTypes.GET_SKILLS:
            return {
                ...state,
                success:false,
                error:false,
                message:"get skills request"
            }
        case skillsActionTypes.GET_SKILLS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                skills: action.payload,
                message:"skills found successfully"
            }
        case skillsActionTypes.GET_SKILLS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting skills"
            }
        default:
            return state
    }
}

export default skillsReducer