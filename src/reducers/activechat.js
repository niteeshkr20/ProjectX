//let initialState = [];
import {SET_ACTIVE_CHAT} from '../actions/ActionTypes'

let initialState = {
    //CHAT_ROOM_JID:'910000000000@jewelchat.net'
}
    

        
const activechat = (state = initialState, action) => {    
    switch (action.type) {
        case SET_ACTIVE_CHAT:{
            if(Object.keys(action.activeChat).length === 0 && action.activeChat.constructor === Object)
                return {};
            else    
                return Object.assign({}, state, action.activeChat) 
        }     
        default:            
            return state      

    }
}

export default activechat