// import XMPP from "../utilities/xmpp/strophe";
// import { store } from '../store'
// import actions from '../actions'
// import AsyncStorage from '@react-native-community/async-storage';
// import db from '../db/localdatabase'
// // const URL = 'ws://13.127.197.210:5280/ws-xmpp';
// //const URL = 'ws://localhost:5280/ws-xmpp';
// let connection = new XMPP.Strophe.Connection(URL);
// connection.registerSASLMechanism = XMPP.Strophe.SASLXOAuth2;


// export const realtimeConnect = () => {

// 	return (dispatch, getState) => {
// 		console.log('REALTIME CONNECT1');
// 		console.log(getState())
// 		// console.log(getState().mytoken.myphone + '@jewelchat')
// 		// console.log(getState().mytoken.token)
// 		//		connection.connect(getState().mytoken.myphone + '@jewelchat.net', getState().mytoken.token, (status, err) => {
// 		connection.connect(getState().mytoken.myphone + '@jewelchat.net', 'pass', (status, err) => {
// 			if (err) {
// 				console.log(' XMPP Error:' + err);
// 				//dispatch({ type: 'XMPP_ERROR' });
// 			}
// 			if (status == Strophe.Status.CONNECTING) {
// 				console.log('Strophe is connecting.');
// 				dispatch({ type: 'XMPP_CONNECTING' });
// 			} else if (status == Strophe.Status.CONNFAIL) {
// 				console.log('Strophe failed to connect.');
// 				dispatch({ type: 'XMPP_CONNECTION_FAIL' });
// 			} else if (status == Strophe.Status.AUTHENTICATING) {
// 				console.log('Strophe is authenticating.');
// 				dispatch({ type: 'XMPP_AUTHENTICATING' });
// 			} else if (status == Strophe.Status.AUTHFAIL) {
// 				dispatch({ type: 'XMPP_AUTH_FAILURE' });
// 				console.log('Strophe is auth failure.');
// 			} else if (status == Strophe.Status.DISCONNECTING) {
// 				dispatch({ type: 'XMPP_DISCONNECTING' });
// 				console.log('Strophe is disconnecting.');
// 			} else if (status == Strophe.Status.DISCONNECTED) {
// 				dispatch({ type: 'XMPP_DISCONNECTED' });
// 				console.log('Strophe is disconnected.');
// 				//save logout time
// 			} else if (status == Strophe.Status.CONNECTED) {
// 				dispatch({ type: 'XMPP_CONNECTED' });
// 				console.log('Strophe is connected.');
// 				console.log(connection)
// 				getServerTime()
// 				dispatch(resendMessages(getState().mytoken.myphone + '@jewelchat.net'))
// 				connection.addHandler(onMessage, null, 'message', null, null, null);
// 				connection.addHandler(onPresence, null, 'presence', null, null, null);
// 				connection.send($pres().tree(), () => {
// 				});
// 				downloadMessages()
// 			}
// 		});
// 	}
// }

// function onPresence(msg) {
// 	console.log(msg.toString());
// 	connection.roster.get((result) => {
// 		console.log('roster')
// 		console.log(result);
// 	});
// 	_handlePresence(msg)
// 	//  connection.roster.add( '3@jewelchat.net', 'nickname', [], function(){    });
// 	//  connection.roster.authorize( '6@jewelchat.net' );
// 	//  connection.roster.subscribe( '2@jewelchat.net' );
// 	return true;
// }

// function _handlePresence(msg) {
// 	var type = msg.getAttribute('type')
// 	var from = msg.getAttribute('from').split('/')[0]
// 	var to = msg.getAttribute('to').split('/')[0]
// 	console.log(type)
// 	console.log(from)
// 	console.log(to)
// 	connection.roster.add('7@jewelchat.net', 'nickname', [], function () { })
// 	if ((type == '' || type == 'unavailable') && from != to) {
// 		let presenceData = JSON.parse(JSON.stringify(store.getState().chatslist.presence))
// 		if (type == 'unavailable')
// 			presenceData[from] = 'offline'
// 		else
// 			presenceData[from] = 'online'
// 		store.dispatch(actions.setPresence(presenceData))
// 	}
// 	else if (type == 'subscribe') {
// 		db.checkIfRowExist(from).then(result => {
// 			if (result.rows.length > 0) {
// 				var contact = result.rows.item(0)
// 				if (contact.IS_PHONEBOOK_CONTACT == 1) {
// 					connection.roster.authorize(from)
// 				}
// 			}
// 			else {
// 				connection.roster.unauthorize(from)
// 			}
// 		})
// 	}
// 	else if (type == 'subscribed') {
// 		connection.roster.authorize(from)
// 	}
// }

// export const sendSubscriptionRequest = (JID) => {
// 	return (dispatch, getState) => {
// 		connection.roster.subscribe(JID);
// 	}
// }


// //onMessage Handler
// const onMessage = (msg) => {
// 	console.log(msg.toString());
// 	var processedMessage = _detectMessagetype(msg)
// 	if (processedMessage.type === 'DownLoad') {
// 		if (processedMessage.subtype === 'Delivery' || processedMessage.subtype === 'Read') {
// 			store.dispatch(handleReadAndDeliveryMessages(processedMessage))
// 		}
// 		else if (processedMessage.subtype === 'Message' || processedMessage.type === 'GroupMessage')
// 			store.dispatch(insertIncomingMessage(processedMessage.data))
// 	}
// 	else if (processedMessage.type === 'Read' || processedMessage.type === 'Delivery') {
// 		store.dispatch(handleReadAndDeliveryMessages(processedMessage))
// 	}
// 	else if (processedMessage.type === 'Message' || processedMessage.type === 'GroupMessage' )
// 		store.dispatch(insertIncomingMessage(processedMessage.data))

// 	else if (processedMessage.type === 'Affiliations' )
// 		store.dispatch(insertIncomingAffiliations(processedMessage.data))	

// 	return true
// }

// //function to sync device time with server time
// function getServerTime() {
// 	var serverTime = $iq({ type: 'get', from: store.getState().mytoken.myphone + '@jewelchat.net', to: 'jewelchat.net', id: 'time_1' })
// 		.c('time', { xmlns: 'urn:xmpp:time' });
// 	connection.sendIQ(serverTime.tree(), (stanza) => {
// 		console.log('CALLBACK serverTime SEND IQ')
// 		console.log(stanza.toString())
// 		var body = stanza.getElementsByTagName('utc')
// 		var time = new Date(Strophe.getText(body[0])).getTime()
// 		var delta = time - new Date().getTime()
// 		global.TimeDelta = delta
// 		console.log('Time delta', delta)
// 	},
// 		(error) => {
// 			console.log('error IQ')
// 			console.log(error.toString())
// 		});
// }

// //function to trigger messages download since last logout time of user
// async function downloadMessages() {
// 	try {
// 		var value = await AsyncStorage.getItem('logOutTime');
// 		value = (new Date().getTime() + global.TimeDelta) - parseInt(value) > 604800000 ? (new Date().getTime() + global.TimeDelta - 604800000) : value
// 		if (value !== null) {
// 			// We have data!!
// 			var download = $iq({ type: 'set' })
// 				.c('query', { xmlns: 'urn:xmpp:mam:2' })
// 				.c('x', { xmlns: 'jabber:x:data', type: 'submit' })
// 				.c('field', { var: 'FORM_TYPE', type: 'hidden' })
// 				.c('value').t('urn:xmpp:mam:2')
// 				.up()
// 				.up()
// 				.c('field', { var: 'start' })
// 				.c('value').t(new Date(parseInt(value)).toISOString())
// 				.up()
// 				.up()
// 				.up()
// 				.c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
// 				.c('max').t('20');
// 			connection.sendIQ(download.tree(), (stanza) => {
// 				console.log('CALLBACK SEND IQ')
// 				console.log(stanza.toString())
// 				var lastElement = stanza.getElementsByTagName('last')
// 				if (lastElement.toString()) {
// 					var last = Strophe.getText(lastElement[0])
// 					_downloadPagination(last, value)
// 				}
// 				else {
// 					//update redux
// 				}
// 			});
// 		}
// 	} catch (error) {
// 		// Error retrieving data
// 	}

// }

// function _downloadPagination(last, value) {
// 	var download = $iq({ type: 'set' })
// 		.c('query', { xmlns: 'urn:xmpp:mam:2' })
// 		.c('x', { xmlns: 'jabber:x:data', type: 'submit' })
// 		.c('field', { var: 'FORM_TYPE', type: 'hidden' })
// 		.c('value').t('urn:xmpp:mam:2')
// 		.up()
// 		.up()
// 		.c('field', { var: 'start' })
// 		.c('value').t(new Date(parseInt(value)).toISOString())
// 		.up()
// 		.up()
// 		.up()
// 		.c('set', { xmlns: 'http://jabber.org/protocol/rsm' })
// 		.c('max').t('20').up()
// 		.c('after').t(last).up();
// 	console.log(download.toString())
// 	connection.sendIQ(download.tree(), (stanza) => {
// 		console.log('CALLBACK SEND IQ1')
// 		console.log(stanza.toString())
// 		var lastElement = stanza.getElementsByTagName('last')
// 		if (lastElement.toString()) {
// 			var last = Strophe.getText(lastElement[0])
// 			_downloadPagination(last, value)
// 		}
// 		else {
// 			//update redux
// 		}
// 	});
// }



// //function to detect message type
// function _detectMessagetype(incomingStanza) {
// 	var type
// 	var subtype
// 	var data
// 	var fwd = incomingStanza.getElementsByTagName('forwarded');
// 	var recieved = incomingStanza.getElementsByTagName('received')
// 	var read = incomingStanza.getElementsByTagName('read')
// 	var date = _dateToYMD((new Date()).getTime() + global.TimeDelta)

// 	if (fwd.toString()) {
// 		type = 'DownLoad'
// 		var delay = incomingStanza.getElementsByTagName('delay')
// 		var stamp = delay[0].getAttribute('stamp')
// 		var delayDate = _dateToYMD(new Date(stamp).getTime())
// 		if (incomingStanza.getElementsByTagName('message').toString()) {
// 			var msg = incomingStanza.getElementsByTagName('message')[0]
// 			//Downloaded Delivery
// 			if (msg.getElementsByTagName('received').toString()) {
// 				subtype = 'Delivery'
// 				data = getFromattedReceipt(msg, subtype, new Date(stamp).getTime())
// 			}
// 			//Downloaded read
// 			else if (msg.getElementsByTagName('read').toString()) {
// 				subtype = 'Read'
// 				data = getFromattedReceipt(msg, subtype, new Date(stamp).getTime())
// 			}
// 			//Downloaded Incoming message
// 			else if (msg.getAttribute('chat').toString()) {
// 				subtype = 'Message'
// 				data = getFormattedMessages(msg, delayDate, IS_GROUP_MSG=0)
// 			}
// 			else if(msg.getAttribute('groupchat').toString()){
// 				if(msg.getElementsByTagName('x').toString()){
// 					subtype = 'Affiliations'
// 					data = getFormattedAffiliations(msg, delayDate)
// 				}
// 				else if(msg.getElementsByTagName('body').toString()){
// 					subtype = 'GroupMessage'
// 					data = getFormattedMessages(msg, delayDate, IS_GROUP_MSG=1)
// 				}
// 			}

// 		}
// 	}
// 	//incoming delivery receipt
// 	else if (recieved.toString()) {
// 		type = 'Delivery'
// 		data = getFromattedReceipt(incomingStanza, type)
// 	}
// 	//incoming read receipt
// 	else if (read.toString()) {
// 		type = 'Read'
// 		data = getFromattedReceipt(incomingStanza, type)
// 	}
// 	// incoming messages
// 	else if(msg.getAttribute('chat').toString()) {
// 		type = 'Message'
// 		data = getFormattedMessages(incomingStanza, date, IS_GROUP_MSG=0)
// 	}
// 	else if(msg.getAttribute('groupchat').toString()){
// 		if(msg.getElementsByTagName('x').toString()){
// 			type = 'Affiliations'
// 			data = getFormattedAffiliations(msg, date)
// 		}
// 		else if(msg.getElementsByTagName('body').toString()){
// 			type = 'GroupMessage'
// 			data = getFormattedMessages(msg, date, IS_GROUP_MSG=1 )
// 		}
// 	}
// 	return ({ type: type, data: data, subtype: subtype })
// }


// function getFormattedAffiliations(msg, createdDateTime) {

// 	affiliationText = "Affiliation message";

// 	var affiliationMessage = {
// 		CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
// 		IS_GROUP_MSG: 1,
// 		MSG_TEXT: affiliationText,
// 		CREATOR_JID: msg.getAttribute('from').split('/')[0],		
// 		CREATED_DATE: createdDateTime.date,
// 		CREATED_TIME: createdDateTime.time,		
// 		MSG_TYPE: -1		
// 	}
// 	return affiliationMessage
// }

// function getFromattedReceipt(msg, type, time = (new Date()).getTime() + global.TimeDelta) {
// 	if (type == 'Delivery') {
// 		var message = msg.getElementsByTagName('received')
// 	}
// 	else {
// 		var message = msg.getElementsByTagName('read')
// 	}
// 	var receipt = {
// 		id: message[0].getAttribute('id'),
// 		time: time,
// 		to: msg.getAttribute('to'),
// 		from: msg.getAttribute('from').split('/')[0]
// 	}
// 	return receipt
// }

// function getFormattedMessages(msg, createdDateTime, IS_GROUP_MSG ) {
// 	console.log(msg.toString())
// 	var jewel = msg.getElementsByTagName('jewel')
// 	var jewelType = jewel[0].getAttribute('number')
// 	var subtype = msg.getAttribute('subtype')
// 	console.log(subtype)
// 	var reply = ( subtype === 'reply' ) ? 1 : 0
// 	var forward = ( subtype === 'forward' ) ? 1 : 0
// 	var parent = msg.getAttribute('parent')
// 	var body = msg.getElementsByTagName('body')
// 	var message = Strophe.getText(body[0]);
// 	var media = msg.getElementsByTagName('media')



// 	var incomingMessage = {
// 		CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
// 		IS_GROUP_MSG: IS_GROUP_MSG,
// 		MSG_TEXT: message,
// 		CREATOR_JID: msg.getAttribute('from').split('/')[0],
// 		GROUP_MEMBER_JID: (IS_GROUP_MSG == 1 ? msg.getAttribute('from').split('/')[1] : msg.getAttribute('from').split('/')[0]),
// 		JEWEL_TYPE: parseInt(jewelType),
// 		CREATED_DATE: createdDateTime.date,
// 		CREATED_TIME: createdDateTime.time,
// 		SENDER_MSG_ID: msg.getAttribute('id'),
// 		MSG_TYPE: ( media ? ( parseInt(media[0].getAttribute('number')) ) : 0 ),
// 		MEDIA_CLOUD: (media ? (Strophe.getText(media[0])) : null ),
// 		SEQUENCE: -1,
// 		IS_REPLY: reply,
// 		IS_FORWARD: forward,
// 		REPLY_PARENT: parent
// 	}
// 	return incomingMessage
// }


// export const handleReadAndDeliveryMessages = (processedMessage) => {
// 	return (dispatch, getState) => {
// 		var type = processedMessage.type == 'DownLoad' ? processedMessage.subtype : processedMessage.type
// 		if (processedMessage.data.from != getState().mytoken.myphone + '@jewelchat.net') {
// 			db.updateDeliveryAndReadRecipt(type, processedMessage.data.id, processedMessage.data.time).then(result => {
// 				if (getState().chatslist.activeChat.JID == processedMessage.data.from) {
// 					dispatch(updateChatData(type, processedMessage.data.id, processedMessage.data.time))
// 				}
// 			}).catch(err => {
// 			})
// 		}
// 	}
// }

// export const updateChatData = (type, id, time) => {
// 	return (dispatch, getState) => {
// 		var chatData = JSON.parse(JSON.stringify(getState().chatroom.chatroom))
// 		chatData.map((item) => {
// 			if (item._ID == id) {
// 				if (type == 'Delivery') {
// 					item['IS_DELIVERED'] = 1
// 					item['TIME_DELIVERED'] = time
// 				}
// 				else if (type == 'Read') {
// 					item['IS_READ'] = 1
// 					item['TIME_READ'] = time
// 				}
// 				else {
// 					item['IS_SUBMITTED'] = 1
// 					item['TIME_SUBMITTED'] = time
// 				}
// 				dispatch(actions.setChatData(chatData))
// 			}
// 		})
// 	}
// }

// //function to handle messages send as a reply to any JID
// export const sendReply = (messageText, chatroom, type, parent) => {

// 	return (dispatch, getState) => {
// 		var createdDateTime = (new Date()).getTime() + global.TimeDelta
// 		var date = _dateToYMD(createdDateTime);
// 		var reply = type == 'reply' ? 1 : 0
// 		var forward = type == 'forward' ? 1 : 0
// 		var message = {
// 			CHAT_ROOM_JID: chatroom,
// 			MSG_TEXT: messageText,
// 			CREATOR_JID: getState().mytoken.myphone + '@jewelchat.net',
// 			JEWEL_TYPE: null,
// 			CREATED_DATE: date.date,
// 			CREATED_TIME: date.time,
// 			MSG_TYPE: 0,
// 			SENDER_MSG_ID: null,
// 			IS_REPLY: reply,
// 			IS_FORWARD: forward,
// 			REPLY_PARENT: parent
// 		}
// 		console.log(message)
// 		db.insertStropheChatData(message).then((result) => {
// 			message['_ID'] = result
// 			message['SENDER_MSG_ID'] = result
// 			dispatch(actions.addChatMessage(message))

// 			var reply = $msg({ to: message.CHAT_ROOM_JID, from: message.CREATOR_JID, type: 'chat', subtype: type, parent: parent, id: message._ID })
// 				.cnode(Strophe.xmlElement('body', message.MSG_TEXT))
// 				.up()
// 				.c('active', { xmlns: "http://jabber.org/protocol/chatstates" });
// 			connection.send(reply.tree(), () => {
// 				console.log('reply triggered')
// 				db.updateDeliveryAndReadRecipt('Submit', result, createdDateTime).then(status => {
// 					dispatch(updateChatData('Submitted', result, createdDateTime))
// 				})
// 			});
// 			dispatch(updateChatlist(message, createdDateTime, 'Active'))
// 		}).catch(err => {

// 		})
// 	}
// }

// // function to convert date in ms to specified format ('YYYY-DD-MM' & 'HH:MM:SS')
// function _dateToYMD(createdDateTime) {
// 	console.log(createdDateTime)
// 	var d = new Date(parseInt(createdDateTime))
// 	//	var date = new Date(1590419829139)
// 	var day = d.getDate()
// 	var month = d.getMonth() + 1
// 	var year = d.getFullYear()
// 	var hour = d.getHours()
// 	var mins = d.getMinutes()
// 	var seconds = d.getSeconds()
// 	var date = (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year
// 	var time = (hour < 10 ? '0' + hour : hour) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (seconds < 10 ? '0' + seconds : seconds)
// 	// var date = d.toLocaleString().split(', ')[0].split('/').reverse().join("-")
// 	// var time = d.toLocaleString().split(', ')[1]
// 	return { date: date, time: time };
// }

// // function to handlle incoming messages (insertion to DB , sending delivery and read receipt)
// export const insertIncomingMessage = (incomingMessage) => {
// 	var createdDateTime = (new Date()).getTime() + global.TimeDelta

// 	return (dispatch, getState) => {
// 		db.insertStropheChatData(incomingMessage).then((result) => {
// 			incomingMessage['_ID'] = result
// 			//send read reciept if activechat
// 			if (getState().chatslist.activeChat.JID == incomingMessage.CHAT_ROOM_JID) {
// 				dispatch(actions.addChatMessage(incomingMessage))
// 				dispatch(updateChatlist(incomingMessage, createdDateTime, 'Active'))

// 				if(!incomingMessage.IS_GROUP_MSG){

// 					var received = $msg({ to: incomingMessage.CHAT_ROOM_JID, from: getState().mytoken.myphone + '@jewelchat.net' })
// 						.c('received', { xmlns: 'urn:xmpp:chat-markers:0', id: incomingMessage.SENDER_MSG_ID, time: createdDateTime })
// 					db.updateDeliveryAndReadRecipt('Delivery', result, createdDateTime)
// 					connection.send(received.tree(), () => {
// 					});
// 					var read = $msg({ to: incomingMessage.CHAT_ROOM_JID, from: getState().mytoken.myphone + '@jewelchat.net' })
// 						.c('read', { xmlns: 'urn:xmpp:chat-markers:0', id: incomingMessage.SENDER_MSG_ID })
// 					connection.send(read.tree(), () => {
// 						db.updateDeliveryAndReadRecipt('Read', result, createdDateTime)
// 					});
// 				}	

// 			}
// 			//otherwise send delivery receipt
// 			else {
// 				dispatch(updateChatlist(incomingMessage, createdDateTime, 'InActive'))

// 				if(!incomingMessage.IS_GROUP_MSG){

// 					var received = $msg({ to: incomingMessage.CHAT_ROOM_JID, from: getState().mytoken.myphone + '@jewelchat.net' })
// 						.c('received', { xmlns: 'urn:xmpp:chat-markers:0', id: incomingMessage.SENDER_MSG_ID })
// 					connection.send(received.tree(), () => {
// 						db.updateDeliveryAndReadRecipt('Delivery', result, createdDateTime)
// 					});

// 				}
// 			}

// 		}).catch(err => {

// 		})
// 	}
// }


// export const insertIncomingAffiliations = (affiliationMessage) => {

// 	return (dispatch, getState) => {
// 		db.insertAffiliations(affiliationMessage).then((result) => {
// 			affiliationMessage['_ID'] = result
// 			//send read reciept if activechat
// 			if (getState().chatslist.activeChat.JID == affiliationMessage.CHAT_ROOM_JID) {
// 				dispatch(actions.addChatMessage(affiliationMessage))
// 				dispatch(updateChatlist(affiliationMessage, createdDateTime, 'Active'))
// 			}
// 			else{
// 				dispatch(updateChatlist(affiliationMessage, createdDateTime, 'InActive'))
// 			}		

// 		}).catch(err => {

// 		})
// 	}

// }

// //function to send read receipt for already delivered messages
// export const sendReadReceipt = (JID) => {
// 	var createdDateTime = (new Date()).getTime() + global.TimeDelta
// 	var date = _dateToYMD(createdDateTime);
// 	return (dispatch, getState) => {
// 		db.selectUnreadMessages(JID).then(result => {
// 			if (result.rows.length > 0) {
// 				for (let i = 0; i < result.rows.length; i++) {
// 					db.updateDeliveryAndReadRecipt('Read', result.rows.item(i)._ID, createdDateTime)

// 					var read = $msg({ to: JID, from: getState().mytoken.myphone + '@jewelchat.net' })
// 						.c('read', { xmlns: 'urn:xmpp:chat-markers:0', id: result.rows.item(i).SENDER_MSG_ID, time: createdDateTime })

// 					connection.send(read.tree(), () => {
// 						//database single ticks
// 					});
// 				}
// 			}
// 		}).catch(err => {

// 		})
// 	}
// }

// //function to Re-send non submitted messages
// export const resendMessages = (JID) => {
// 	console.log('JID', JID)
// 	var createdDateTime = (new Date()).getTime() + global.TimeDelta
// 	var date = _dateToYMD(createdDateTime);
// 	return (dispatch, getState) => {
// 		db.selectUnsendMessages(JID).then(result => {
// 			if (result.rows.length > 0) {
// 				for (let i = 0; i < result.rows.length; i++) {
// 					var message = result.rows.item(i)
// 					var reply = $msg({ to: message.CHAT_ROOM_JID, from: message.CREATOR_JID, type: 'chat', id: message._ID, createdDate: createdDateTime })
// 						.cnode(Strophe.xmlElement('body', message.MSG_TEXT))
// 						.up()
// 						.c('active', { xmlns: "http://jabber.org/protocol/chatstates" });
// 					connection.send(reply.tree(), () => {
// 						console.log('reply triggered')
// 						db.updateDeliveryAndReadRecipt('Submit', message._ID, createdDateTime)
// 						dispatch(updateChatlist(message, createdDateTime, 'Active'))
// 					});
// 				}
// 			}
// 		}).catch(err => {

// 		})
// 	}
// }


		

// // function to update chat list on any messaging activity
// export const updateChatlist = (message, createdDateTime, messageType) => {
// 	return (dispatch, getState) => {
// 		console.log('came to update chatlist', message.CHAT_ROOM_JID)
// 		let data = {
// 			JID: message.CHAT_ROOM_JID,
// 			CONTACT_NUMBER: message.CHAT_ROOM_JID.split('@')[0],
// 			CONTACT_NAME: message.IS_GROUP === 1 ? 'New Group' : null,
// 			IS_PHONEBOOK_CONTACT: 0,
// 			PHONEBOOK_CONTACT_NAME: null,
// 			IS_REGIS: 1,
// 			IS_GROUP: message.IS_GROUP_MSG
// 		}
// 		console.log(data)
// 		db.insertContactData(data).then(response => {
// 			db.updateLastMessageAndText(message, createdDateTime, messageType).then(result => {
// 				db.getChatList().then(results => {
// 					let chatList = []
// 					for (let i = 0; i < results.rows.length; i++) {
// 						chatList.push(results.rows.item(i))
// 					}
// 					dispatch(actions.setChatListData(chatList))
// 				}).catch(err => {
// 					console.log(err)
// 				})
// 			}).catch(error => {

// 			})
// 		}).catch(error => {
// 			db.updateLastMessageAndText(message, createdDateTime, messageType).then(result => {
// 				db.getChatList().then(results => {
// 					let chatList = []
// 					for (let i = 0; i < results.rows.length; i++) {
// 						chatList.push(results.rows.item(i))
// 					}
// 					store.dispatch(actions.setChatListData(chatList))
// 				}).catch(err => {
// 					console.log(err)
// 				})
// 			}).catch(error => {

// 			})
// 		})
// 	}
// }

// function _initRedux() {
// 	db.getChatList().then(results => {
// 		let chatList = []
// 		for (let i = 0; i < results.rows.length; i++) {
// 			chatList.push(results.rows.item(i))
// 		}
// 		store.dispatch(actions.setChatListData(chatList))
// 	}).catch(err => {
// 		console.log(err)
// 	})
// 	if (store.getState().chatslist.activeChat.JID) {
// 		db.getChats(store.getState().chatslist.activeChat.JID, 0)
// 			.then(results => {
// 				let chatroom = []
// 				for (let i = 0; i < results.rows.length; i++) {
// 					chatroom.push(results.rows.item(i))
// 				}
// 				store.dispatch(actions.setChatData(chatroom))

// 			}).catch(err => {
// 				console.log(err)
// 			})
// 	}
// }

// export const realtimeDisconnect = () => {
// 	return (dispatch, getState) => {
// 		console.log('REALTIME DISCONNECT');
// 		connection.disconnect();
// 	}
// }




// export default {
// 	realtimeConnect,
// 	realtimeDisconnect,
// 	sendReply,
// 	sendReadReceipt,
// 	sendSubscriptionRequest
// }

// /*

// export const xmppConnect = (userToken) => {
// 	console.log('XMPP');
//     return (dispatch, getState) => {

// 				dispatch({ type: 'XMPP_START_CONNECTING' });

// 				connection = new XMPP.Strophe.Connection(this.WEBSOCKET_SERVICE);

// 				connection.registerSASLMechanism = XMPP.Strophe.SASLXOAuth2;

// 				connection.connect('user1@jewelchat', userToken, () => {

// 						if(err){
// 							console.log('Error:'+err);
// 							dispatch({ type: 'XMPP_ERROR' });
// 						}

// 						if (status == Strophe.Status.CONNECTING) {
// 							console.log('Strophe is connecting.');
// 							dispatch({ type: 'XMPP_CONNECTING' });
// 						} else if (status == Strophe.Status.CONNFAIL) {
// 							console.log('Strophe failed to connect.');
// 							dispatch({ type: 'XMPP_CONNECTIOn_FAIL' });
// 						} else if (status == Strophe.Status.AUTHENTICATING) {
// 							console.log('Strophe is authenticating.');
// 							dispatch({ type: 'XMPP_AUTHENTICATING' });
// 						} else if (status == Strophe.Status.AUTHFAIL) {
// 							dispatch({ type: 'XMPP_AUTH_FAILURE' });
// 							console.log('Strophe is auth failure.');
// 						} else if (status == Strophe.Status.DISCONNECTING) {
// 							dispatch({ type: 'XMPP_DISCONNECTING' });
// 							console.log('Strophe is disconnecting.');
// 						} else if (status == Strophe.Status.DISCONNECTED) {
// 							dispatch({ type: 'XMPP_DISCONNECTED' });
// 							console.log('Strophe is disconnected.');
// 						} else if (status == Strophe.Status.CONNECTED) {
// 							dispatch({ type: 'XMPP_CONNECTED' });

// 							connection.addHandler((msg)=>{




// 							}, null, 'message', null, null,  null);

// 							connection.send($pres().tree());
// 							connection.roster.init(connection);

// 							console.log('Strophe is connected.');
// 						}

// 				});

//     }

// }



// */
