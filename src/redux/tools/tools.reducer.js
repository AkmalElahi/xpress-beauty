import { toolsActionTypes } from './tools.actionTypes'

const INITIAL_STATE = {
    success: false,
    tools: null,
    error: false,
    message:""
}

const toolsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toolsActionTypes.GET_TOOLS:
            return {
                ...state,
                success:false,
                error:false,
                message:"get tools request"
            }
        case toolsActionTypes.GET_TOOLS_SUCCESS:
            return {
                ...state,
                success: true,
                error: false,
                tools: action.payload,
                message:"tools found successfully"
            }
        case toolsActionTypes.GET_TOOLS_FAIL:
            return {
                ...state,
                success: false,
                error: true,
                message: "error in getting tools"
            }
        default:
            return state
    }
}

export default toolsReducer