import {getConnectionObj} from './realtimeobj';
import actions from '../../actions';

export const handlePresence = (msg) => {

    return (dispatch, getState) => {

        var type = msg.getAttribute('type')
        var from = msg.getAttribute('from').split('/')[0]
        var to = msg.getAttribute('to').split('/')[0]
        console.log('PRESENCE',type, from, to)  
        
        let obj = {};
        obj[from] = 'offline'

        if(type === 'unavailable'){
            obj[from] = 'offline'
            dispatch(actions.setPresence(obj))
        }else {
            obj[from] = 'online'
            dispatch(actions.setPresence(obj))
        }   

    }    
}


export const handleChatState = (processedmessage) => {

    return (dispatch, getState) => {

        let CHAT_STATE = processedmessage.CHAT_STATE
        let CHAT_ROOM_JID = processedmessage.CHAT_ROOM_JID
        
        console.log('CHAT STATE', processedmessage);

        let obj = {};
        obj[CHAT_ROOM_JID] = CHAT_STATE === 'composing' ? 'typing...' : 'online';

        if(getState().presence[CHAT_ROOM_JID] && (getState().presence[CHAT_ROOM_JID] === 'online' || getState().presence[CHAT_ROOM_JID] === 'typing...' ))
            dispatch(actions.setActivity(obj))          

    }

}