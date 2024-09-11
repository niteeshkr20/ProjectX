//let initialState = [];
import { SET_CHAT_DATA, ADD_CHAT_MESSAGE } from '../actions/ActionTypes'

let initialState = {
    chatroom: []
}
const chatroom = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAT_DATA:
            return {
                ...state,
                chatroom: action.chatData
            }
        case ADD_CHAT_MESSAGE:
            return {
                ...state,
                chatroom: [...action.message,...state.chatroom]
            }

        default:
            return state
    }
}

export default chatroom