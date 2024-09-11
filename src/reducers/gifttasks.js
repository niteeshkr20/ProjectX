import { SET_GIFT_TASK_DATA, EMPTY_GIFT_TASK_DATA } from '../actions/ActionTypes'

let initialState = {
    gifttasks: []
}


const tasks = (state = initialState, action) => {
    switch (action.type) {
        case SET_GIFT_TASK_DATA:
            return {
                ...state,
                gifttasks: [...state.gifttasks, ...action.payload]
            }
        case EMPTY_GIFT_TASK_DATA:
            return {
                gifttasks: []
            }    
        default:
            return state
    }
}

export default tasks