import { SET_TASK_DATA } from '../actions/ActionTypes'
let initialState = {
    tasks: []
}



const tasks = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK_DATA:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}

export default tasks