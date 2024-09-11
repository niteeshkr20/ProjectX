//import XMPP from "../utilities/xmpp/strophe";
import { store } from '../store'
import actions from '../actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '../db/localdatabase'

import {handlePresence, handleChatState} from './realtime-utils/presence-roster';
import {downloadMessages} from './realtime-utils/download-history';
import {getServerTime, detectMessagetype } from './realtime-utils/utilities';

import {insertIncomingMessageViaHistoryDownload, insertIncomingMessage, updateChatPageRedux, updateChatlistRedux } from './realtime-utils/messages';
import {handleReadAndDeliveryMessages, handleReadAndDeliveryMessagesViaHistoryDownload} from './realtime-utils/read-delivery-messages'

import {getConnectionObj} from './realtime-utils/realtimeobj'


export default {	
	realtimeConnect,
	realtimeDisconnect
	//sendReply,
	//sendReadReceipt,
	//sendSubscriptionRequest
}


global.xmppconnection_inprocess = false;
global.dowloadMessagesComplete = false;



export const realtimeConnect = () => {

	return (dispatch, getState) => {
		return
		
		// console.log(getState().mytoken.myphone + '@jewelchat')
		// console.log(getState().mytoken.token)
		//		connection.connect(getState().mytoken.myphone + '@jewelchat.net', getState().mytoken.token, (status, err) => {

			

			console.log('Strophe Conn start.', (new Date()).toTimeString());	
			console.log('Strophe Conn start.', getState().mytoken.myphone + '@jewelchat.net' );
			console.log('Strophe Conn start.', getState().mytoken.token );
			console.log('Strophe Conn isconnected', getConnectionObj().connected );

			if(getConnectionObj().connected)
				return;

			getConnectionObj().connect(getState().mytoken.myphone + '@jewelchat.net', getState().mytoken.token, (status, err) => {
			// if (err) {
			// 	console.log(' XMPP Error:' + err);
			// 	//dispatch({ type: 'XMPP_ERROR' });
			// }
			// if (status == Strophe.Status.CONNECTING) {
			// 	console.log('Strophe is connecting.');
			// 	//dispatch({ type: 'XMPP_CONNECTING' });
			// } else if (status == Strophe.Status.CONNFAIL) {
			// 	console.log('Strophe failed to connect.');
			// 	//dispatch({ type: 'XMPP_CONNECTION_FAIL' });
			// } else if (status == Strophe.Status.AUTHENTICATING) {
			// 	console.log('Strophe is authenticating.');
			// 	//dispatch({ type: 'XMPP_AUTHENTICATING' });
			// } else if (status == Strophe.Status.AUTHFAIL) {
			// 	//dispatch({ type: 'XMPP_AUTH_FAILURE' });
			// 	console.log('Strophe is auth failure.');
			// } else if (status == Strophe.Status.DISCONNECTING) {
			// 	//dispatch({ type: 'XMPP_DISCONNECTING' });
			// 	console.log('Strophe is disconnecting.');
			// } else 
			if (status == Strophe.Status.DISCONNECTED) {
				dispatch({ type: 'XMPP_DISCONNECTED' });
				console.log('Strophe is disconnected.');
				getConnectionObj().reset();
				//save logout time
			} else if (status == Strophe.Status.CONNECTED) {
				dispatch({ type: 'XMPP_CONNECTED' });
				
				console.log('Strophe is connected.', (new Date()).toTimeString());	

				

				//dispatch(resendMessages(getState().mytoken.myphone + '@jewelchat.net'));


				// onMessage Handler
				getConnectionObj().addHandler((msg) => {
					console.log('STANZA', msg);
					let processedMessage = detectMessagetype(msg)
					console.log('PROCESSED MSG', processedMessage);
					if (processedMessage.type === 'DownLoad') {
						if (processedMessage.subtype === 'Delivery' || processedMessage.subtype === 'Read') {
							dispatch(handleReadAndDeliveryMessagesViaHistoryDownload(processedMessage))
						}
						else if (processedMessage.subtype === 'Message' || processedMessage.type === 'GroupMessage')
							dispatch(insertIncomingMessageViaHistoryDownload(processedMessage.data))

						// else if (processedMessage.subtype === 'Affiliations' )
						// 	dispatch(insertIncomingAffiliationsViaHistoryDownload(processedMessage.data))		
					}
					else if (processedMessage.type === 'Read' || processedMessage.type === 'Delivery') {
						dispatch(handleReadAndDeliveryMessages(processedMessage))
					}
					else if(processedMessage.type === 'ChatStates'){
						dispatch(handleChatState(processedMessage.data))
					}
					else if (processedMessage.type === 'Message'){
						dispatch(insertIncomingMessage(processedMessage.data))
						let obj = {CHAT_ROOM_JID: processedMessage.data.CHAT_ROOM_JID, CHAT_STATE: 'active' }
						dispatch(handleChatState(obj))
					}	
					else if (processedMessage.type === 'GroupMessage' )
						dispatch(insertIncomingMessage(processedMessage.data))	

					// else if (processedMessage.type === 'Affiliations' )
					// 	dispatch(insertIncomingAffiliations(processedMessage.data))	

					return true

				}, null, 'message', null, null, null);

				// onPresence handler
				getConnectionObj().addHandler((msg)=>{

					console.log('PRESENCE HANDLE',msg.toString());	
					dispatch(handlePresence(msg));									
					return true;

				}, null, 'presence', null, null, null);

				//send presence 
				getConnectionObj().send($pres().tree(), () => {});

				getConnectionObj().roster.init(getConnectionObj());

				getServerTime(getState().mytoken.myphone)
				.then(delta => {

					//download history since your last logout	after getting server time
					AsyncStorage.getItem('logOutTime')
					.then( (lastlogouttime) => {	
						console.log('LOGOUT TIME', lastlogouttime);	
						if( lastlogouttime ){		
								
							let current_servertime = new Date().getTime() + global.TimeDelta
							lastlogouttime = current_servertime - parseInt(lastlogouttime) > 604800000 ? (current_servertime - 604800000) : (parseInt(lastlogouttime) - 1200000);
							dispatch(downloadMessages(lastlogouttime));
						}else
							global.dowloadMessagesComplete = true;
					});

				})
				.catch(err => {

				})


				if(getState().mytoken.tokenrefresh == true){
					console.log('Push Notification Setup')
					let pn = $iq({type:'set'})
							.c('enable', {xmlns: 'urn:xmpp:push:0', jid:'virtual.jewelchat.net', node:getState().mytoken.myphone})
							.c('x',{xmlns:'jabber:x:data', type:'submit'})
							.c('field',{var:'FORM_TYPE'})
								.c('value').t('http://jabber.org/protocol/pubsub#publish-options')
								.up()
							.up()
							.c('field',{var:'service'})
								.c('value').t('fcm')
								.up()
							.up()
							.c('field',{var:'device_id'})
								.c('value').t(getState().mytoken.fcmToken)
								.up()
							.up()
							.c('field',{var:'silent'})
								.c('value').t('false')
								.up()
							.up()							
							
								

					getConnectionObj().sendIQ(pn.tree(), (stanza) => {
						console.log('CALLBACK SEND IQ PUSH NOTIFICATION SETUP')
						let myTokens = {
							tokenrefresh:false, fcmToken: ''
						}
						dispatch({ type: 'USER_TOKEN_LOADED', myTokens })
						//console.log(stanza)
					}); 

				}

				
				
			}//End of Connected if statement 
		});

		
	}
}


export const realtimeDisconnect = () => {
	return (dispatch, getState) => {
		console.log('REALTIME DISCONNECT');
		getConnectionObj().disconnect();
	}
}




export const sendReply = (messageText, chatroom, type, parent) => {

	return (dispatch, getState) => {

		var createdDateTime = (new Date()).getTime() + global.TimeDelta
		var date = _dateToYMD(createdDateTime);
		var reply = type == 'reply' ? 1 : 0
		var forward = type == 'forward' ? 1 : 0
		var message = {
			CHAT_ROOM_JID: chatroom,
			MSG_TEXT: messageText,
			CREATOR_JID: getState().mytoken.myphone + '@jewelchat.net',
			JEWEL_TYPE: null,
			CREATED_DATE: date.date,
			CREATED_TIME: date.time,
			MSG_TYPE: 0,
			SENDER_MSG_ID: null,
			IS_REPLY: reply,
			IS_FORWARD: forward,
			REPLY_PARENT: parent
		}
		console.log(message)
		db.insertStropheChatData(message).then((result) => {
			message['_ID'] = result
			message['SENDER_MSG_ID'] = result
			dispatch(actions.addChatMessage(message))

			var reply = $msg({ to: message.CHAT_ROOM_JID, from: message.CREATOR_JID, type: 'chat', subtype: type, parent: parent, id: message._ID })
				.cnode(Strophe.xmlElement('body', message.MSG_TEXT))
				.up()
				.c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

			getConnectionObj().send(reply.tree(), () => {
				console.log('reply triggered')
				db.updateDeliveryAndReadRecipt('Submit', result, createdDateTime).then(status => {
					dispatch(updateChatData('Submitted', result, createdDateTime))
				})
			});
			dispatch(updateChatlist(message, createdDateTime, 'Active'))
		}).catch(err => {

		})
		
	}
}




