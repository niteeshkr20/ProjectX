import db from '../../db/localdatabase'
import {updateChatPageRedux, updateChatlistRedux} from './messages';
import {getConnectionObj} from './realtimeobj';

export const handleReadAndDeliveryMessages = (processedMessage) => {
	return (dispatch, getState) => {
		var type = processedMessage.type;		
		if (processedMessage.data.from != getState().mytoken.myphone + '@jewelchat.net') {

			db.updateReceivedDeliveryAndReadReceipt(type, processedMessage.data.id, processedMessage.data.time, processedMessage.data.from).then(result => {
				
				if (getState().activechat.JID === processedMessage.data.from) 
					dispatch(updateChatPageRedux());                    
                
                dispatch(updateChatlistRedux());
                
			}).catch(err => {})
		}
	}
}


export const handleReadAndDeliveryMessagesViaHistoryDownload = (processedMessage) => {
	return (dispatch, getState) => {
		var type = processedMessage.subtype;
		if (processedMessage.data.from != getState().mytoken.myphone + '@jewelchat.net') {
            db.updateReceivedDeliveryAndReadReceipt(type, processedMessage.data.id, processedMessage.data.time, processedMessage.data.from)
            .then(result => {}).catch(err => {})
		}
	}
}


export const sendBulkReadReceipts = (CHAT_ROOM_JID, myjid) => {

	return (dispatch, getState) => {

		//if (getState().activechat.JID){
			
			console.log('SEND BULK RECEIPTS', CHAT_ROOM_JID, myjid);
			let createdDateTime = new Date().getTime() + global.TimeDelta;


			db.getHighestNotReadMsgID(CHAT_ROOM_JID, myjid).then(results => {		
				console.log('HIGHEST MSG ID', results);
				if(results.length > 0 && results[0].MAX_ID){		

					let read = $msg({ to: CHAT_ROOM_JID, from: myjid }).c('displayed', { xmlns: 'urn:xmpp:chat-markers:0', id: results[0].SENDER_MSG_ID });
					console.log(read);
					try{	
						getConnectionObj().send(read.tree(), () => {
							console.log('Displayed Message sent');
							db.updateBulkReadReceipt(CHAT_ROOM_JID, results[0].MAX_ID, createdDateTime).then(val=>{
								dispatch(updateChatlistRedux());
							}).catch(err=>{});
						});	
					}catch(err){
						console.log('XMPP error')
					}
				
				}
				

			}).catch(err => {
				console.log('Send bulk read receipt error', err)
			})

		//}	

	}		
	
}

