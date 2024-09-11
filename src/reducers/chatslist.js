//let initialState = [];
import {SET_CHAT_LIST_DATA} from '../actions/ActionTypes'

let initialState = [];
    

        
const chatslist = (state = initialState, action) => {
    
    switch (action.type) {        
        case SET_CHAT_LIST_DATA:
            return Object.assign([], state, action.chatList)             
        default:            
            return state      
    }
}

export default chatslist