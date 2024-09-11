import { SET_GIFT_TASK_DETAILS } from '../actions/ActionTypes'
let initialState = {
    taskdetails: {}
}




const tasks = (state = initialState, action) => {
    switch (action.type) {
        case SET_GIFT_TASK_DETAILS:
            return {
                ...state,
                taskdetails: action.payload
            }
        default:
            return state
    }
}

export default tasks