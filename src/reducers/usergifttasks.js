import {SET_USER_GIFT_TASK} from '../actions/ActionTypes'
let initialState = {
    usergifttasks : {}
}
    
const tasks = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_GIFT_TASK:
            return {
                ...state,
                usergifttasks: action.payload
            }
        default:            
            return state        
    }
}

export default tasks