import {getConnectionObj} from './realtimeobj';

export const getServerTime = (myphone) => {

	return new Promise((resolve, reject) => {
		let serverTime = $iq({ type: 'get', from: myphone + '@jewelchat.net', to: 'jewelchat.net', id: 'time_1' })
						.c('time', { xmlns: 'urn:xmpp:time' });

		console.log('GET SERVER TIME');				
		getConnectionObj().sendIQ(serverTime.tree(), (stanza) => {
			console.log('CALLBACK serverTime SEND IQ')
			console.log(stanza.toString())
			var body = stanza.getElementsByTagName('utc')
			var servertime = new Date(Strophe.getText(body[0])).getTime()
			let currtime = new Date().getTime();
			var delta = servertime - currtime;
			global.TimeDelta = delta
			console.log('Servertime', servertime)
			console.log('Time delta', currtime)
			console.log('Time delta', delta)
			resolve(delta)
		},(error) => {
			console.log('error IQ')
			console.log(error.toString())
			reject(error);
		});

	});

}

export const composeMessage = (msgtype, msgtext, media_cloud) => {

	let outgoingMessage = {
		CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
		IS_GROUP_MSG: IS_GROUP_MSG,
		MSG_TEXT: message,
		CREATOR_JID: (IS_GROUP_MSG == 1 ? msg.getAttribute('from').split('/')[1] : msg.getAttribute('from').split('/')[0]),		
		JEWEL_TYPE: parseInt(jewelType),
		CREATED_DATE: createdDateTime.date,
		CREATED_TIME: createdDateTime.time,
		TIME_CREATED: createdDateTime.fulltime,
		SENDER_MSG_ID: IS_GROUP_MSG == 0 ? msgid : ( fromjid === tojid ? null : msgid ),
		MSG_TYPE: msgtype,
		MEDIA_CLOUD: media_cloud,
		MEDIA_CLOUD_THUMBNAIL: media_thumbnail,
		SEQUENCE: -1,
		IS_REPLY: reply,
		IS_FORWARD: forward,
		REPLY_PARENT: parent
	}

}


export const detectMessagetype = (incomingStanza) => {
	var type, subtype, data;	
	var fwd = incomingStanza.getElementsByTagName('forwarded');
	var recieved = incomingStanza.getElementsByTagName('received')
	var read = incomingStanza.getElementsByTagName('displayed')

	let act_active = incomingStanza.getElementsByTagName('active');
	let act_composing = incomingStanza.getElementsByTagName('composing');
	

	var date = dateToYMD((new Date()).getTime() + global.TimeDelta)

	

	if (fwd.toString()) {
		type = 'DownLoad'
		var delay = incomingStanza.getElementsByTagName('delay')
		var stamp = delay[0].getAttribute('stamp')
		var delayDate = dateToYMD(new Date(stamp).getTime())
		if (incomingStanza.getElementsByTagName('message').toString()) {
			var msg = incomingStanza.getElementsByTagName('message')[0]
			console.log('MSG', msg);
			//Downloaded Delivery
			if (msg.getElementsByTagName('received').toString()) {
				subtype = 'Delivery'
				data = getFromattedReceipt(msg, subtype, new Date(stamp).getTime())
			}
			//Downloaded read
			else if (msg.getElementsByTagName('displayed').toString()) {
				subtype = 'Read'
				data = getFromattedReceipt(msg, subtype, new Date(stamp).getTime())
			}
			//Downloaded Incoming message
			else if (msg.getAttribute('type').toString()==='chat') {
				subtype = 'Message'
				data = getFormattedMessages(msg, delayDate, IS_GROUP_MSG=0)
			}
			else if(msg.getAttribute('type').toString()==='groupchat'){
				if(msg.getElementsByTagName('x').toString()){
					subtype = 'Affiliations'
					data = getFormattedAffiliations(msg, delayDate)
				}
				else if(msg.getElementsByTagName('body').toString()){
					subtype = 'GroupMessage'
					data = getFormattedMessages(msg, delayDate, IS_GROUP_MSG=1)
				}
			}

		}
	}
	//incoming delivery receipt
	else if (recieved.toString()) {
		type = 'Delivery'
		data = getFromattedReceipt(incomingStanza, type)
	}
	//incoming read receipt
	else if (read.toString()) {
		type = 'Read'
		data = getFromattedReceipt(incomingStanza, type)
	}
	else if(incomingStanza.getAttribute('type').toString() === 'chatactivity') {
		type = 'ChatStates'
		data = {
			CHAT_ROOM_JID: incomingStanza.getAttribute('from').split('/')[0],
			CHAT_STATE: (act_composing.toString() ? 'composing' : 'active')
		}
	}
	// incoming messages
	else if(incomingStanza.getAttribute('type').toString() === 'chat') {
		type = 'Message'
		data = getFormattedMessages(incomingStanza, date, IS_GROUP_MSG=0)
	}
	else if(incomingStanza.getAttribute('type').toString() === 'groupchat'){
		if(incomingStanza.getElementsByTagName('x').toString()){
			type = 'Affiliations'
			data = getFormattedAffiliations(incomingStanza, date)
		}
		else if(incomingStanza.getElementsByTagName('body').toString()){
			type = 'GroupMessage'
			data = getFormattedMessages(incomingStanza, date, IS_GROUP_MSG=1 )
		}
	}
	return ({ type: type, data: data, subtype: subtype })
}



function getFormattedAffiliations(msg, createdDateTime) {

	let affiliationText = "Affiliation message";

	let to = msg.getAttribute('to').split('@')[0];
	let xelem = msg.getElementsByTagName('x');
	let user = xelem[0].getElementsByTagName('user');
	let subject = xelem[0].getElementsByTagName('subject');
	let roomname = xelem[0].getElementsByTagName('roomname');
	// if(user.toString()){


	// }else if(subject.toString()){
	// 	affiliationText = 'Group status changed'
	// }else if(roomname.toString()){
	// 	affiliationText = 'Group name changed'
	// }


	


	let affiliationMessage = {
		CHAT_ROOM_JID: msg.getAttribute('from').split('@')[0],
		IS_GROUP_MSG: 1,
		MSG_TEXT: affiliationText,
		CREATOR_JID: msg.getAttribute('from').split('@')[0],
		SENDER_MSG_ID: msg.getAttribute('id'),		
		CREATED_DATE: createdDateTime.date,
		CREATED_TIME: createdDateTime.time,
		TIME_CREATED: createdDateTime.fulltime,		
		MSG_TYPE: -1		
	}

	console.log(affiliationMessage);

	return affiliationMessage
}

function getFromattedReceipt(msg, type, time = (new Date()).getTime() + global.TimeDelta) {
	
	let message;

	if (type == 'Delivery') {
		message = msg.getElementsByTagName('received')
	}
	else {
		message = msg.getElementsByTagName('displayed')
	}
	let receipt = {
		id: message[0].getAttribute('id'),
		time: time,
		to: msg.getAttribute('to'),
		from: msg.getAttribute('from').split('/')[0]
	}

	return receipt;
}

function getFormattedMessages(msg, createdDateTime, IS_GROUP_MSG ) {
	//console.log('ReceivedMsg',msg.toString())
	var jewel = msg.getElementsByTagName('jewel');
	var jewelType = (jewel[0] ? jewel[0].getAttribute('number') : null);
	var subtype = msg.getAttribute('subtype');
	//console.log(subtype)
	var reply = ( subtype === 'reply' ) ? 1 : 0;
	var forward = ( subtype === 'forward' ) ? 1 : 0;
	var parent = msg.getAttribute('parent');
	var body = msg.getElementsByTagName('body');
	var message = (body[0] ? Strophe.xmlunescape( Strophe.getText(body[0]) ) : null);
	//console.log('ReceivedMsg',body.toString())
	//console.log('ReceivedMsg',message.toString())
	var media = msg.getElementsByTagName('media');
	var msgtype = ( media[0] ? ( parseInt(media[0].getAttribute('number')) ) : 0 );
	var media_cloud = ( media[0] ? ( media[0].getAttribute('link') ) : null );
	var media_thumbnail = (msgtype == 2 ? ( media[0].getAttribute('thumbnail')) : null );


	// In the case of group chat sender message id is kept deliberately null when groupchat received from self
	var fromjid;
	if(IS_GROUP_MSG ==1)
		fromjid = msg.getAttribute('from').split('/')[1];
	var tojid = msg.getAttribute('to');

	var msgid = msg.getAttribute('id')

	var incomingMessage = {
		CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
		IS_GROUP_MSG: IS_GROUP_MSG,
		MSG_TEXT: message,
		CREATOR_JID: (IS_GROUP_MSG == 1 ? msg.getAttribute('from').split('/')[1] : msg.getAttribute('from').split('/')[0]),		
		JEWEL_TYPE: parseInt(jewelType),
		CREATED_DATE: createdDateTime.date,
		CREATED_TIME: createdDateTime.time,
		TIME_CREATED: createdDateTime.fulltime,
		SENDER_MSG_ID: IS_GROUP_MSG == 0 ? msgid : ( fromjid === tojid ? null : msgid ),
		MSG_TYPE: msgtype,
		MEDIA_CLOUD: media_cloud,
		MEDIA_CLOUD_THUMBNAIL: media_thumbnail,
		SEQUENCE: -1,
		IS_REPLY: reply,
		IS_FORWARD: forward,
		REPLY_PARENT: parent
	}

	console.log('Incoming Message >>>',incomingMessage);
	
	return incomingMessage
}



// function to convert date in ms to specified format ('YYYY-DD-MM' & 'HH:MM:SS')
export const dateToYMD = (createdDateTime) => {
	console.log(createdDateTime)
	var d = new Date(parseInt(createdDateTime))
	//	var date = new Date(1590419829139)
	var day = d.getDate()
	var month = d.getMonth() + 1
	var year = d.getFullYear()
	var hour = d.getHours()
	var mins = d.getMinutes()
	var seconds = d.getSeconds()
	var date = (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year
	var time = (hour < 10 ? '0' + hour : hour) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (seconds < 10 ? '0' + seconds : seconds)
	// var date = d.toLocaleString().split(', ')[0].split('/').reverse().join("-")
	// var time = d.toLocaleString().split(', ')[1]
	return { date: date, time: time , fulltime: createdDateTime };
}

