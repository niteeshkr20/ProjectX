import { SET_CHAT_DATA, ADD_CHAT_MESSAGE } from './ActionTypes'
import db from '../db/localdatabase'
export const setChatData = (chatData) => {
    return {
        type: SET_CHAT_DATA,
        chatData: chatData
    }
}

export const updateChatRoom = (id) => {
    return (dispatch, setState) => {
        let chatList = JSON.parse(JSON.stringify(getState().chatroom.chatroom))
        for (let i = 0; i < chatList.length; i++) {
            if (chatList[i]._ID == id) {
                chatList[i].IS_JEWEL_PICKED = 1
            }
        }

        dispatch(setChatData())
    }
}

export const addChatMessage = (message) => {
    return {
        type: ADD_CHAT_MESSAGE,
        message: message
    }
}
