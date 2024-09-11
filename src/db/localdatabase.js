import SQLite from 'react-native-sqlite-storage';
import SQL from './queries';
import phoneContactModal from './phoneContactModal';
//import {populateTestData} from './TestData';


if(__DEV__){
   // SQLite.DEBUG(true);
}

SQLite.enablePromise(true);

let _jcdb

export default {
	getChats, getAllChatsGreaterThanEqual_ID, getChatList, updatePhoneContact, insertStropheChatData, insertAffiliations, updateReceivedDeliveryAndReadReceipt, updateDeliveryAndReadReceipt, updateBulkReadReceipt, getHighestNotReadMsgID, getContactList, updatePickedJewel,
	updateLastMessageAndText, selectUnreadMessages, selectUnsendMessages, updateContact, insertContactData, checkIfRowExist, insertTeamJC, deleteAllData, getAllChatsDbInspect
};

SQLite.openDatabase({
	name: 'jewelchat.db',
	version: '1.0'
}).then(instance => {
	_jcdb = instance;
	console.log('APP START DATABASE CONNECTION SUCCESSFUL');
	console.log(_jcdb)
	return _jcdb.transaction((txn) => {

		let queries = [];

		let q = txn.executeSql(SQL.Create_Contact);
		queries.push(q);

		q = txn.executeSql(SQL.Create_ChatMessage)
		queries.push(q);

		q = txn.executeSql(SQL.Sequence_Trigger)
		queries.push(q);
		return Promise.all(queries);
	})

}).then(val => {
	console.log('APP START CREATE TABLES PROMISE SUCCESSFUL')
	console.log(val)
}).then((result) => {
	console.log('APP START TRANSACTION SUCCESSFUL')
	//populateTestData();
}).catch(err => {
	console.log('APP START DATABASE ERROR');
	console.log(err);
	//kill app
});


function _initDb() {
	return new Promise((resolve, reject) => {
		if (_jcdb)
			resolve(_jcdb);
		else {
			SQLite.openDatabase({
				name: 'jewelchat.db',
				version: '1.0'
			}).then(instance => {
				_jcdb = instance;
				resolve(_jcdb);
			}).catch(err => {
				reject(err);
			})
		}
	})
}

function getAllChatsDbInspect(){

	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {

				
					txn.executeSql('select _ID, SENDER_MSG_ID, CHAT_ROOM_JID,CREATOR_JID, IS_READ FROM ChatMessage ORDER BY _ID')
						.then((results) => {							
							resolve(results[1].rows.raw())
						})
						.catch(err => {
							reject(err)
						})
				
			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});

}

function getChats(JID, offset, isgroupmsg) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {

				if (isgroupmsg == 0 || isgroupmsg == null) {
					txn.executeSql('select * FROM ChatMessage a JOIN (select MAX(SEQUENCE) as MAX_SEQUENCE from ChatMessage) b where a.CHAT_ROOM_JID ="' + JID + '" ORDER BY a._ID DESC LIMIT 20 OFFSET ' + offset)
						.then((results) => {
							console.log('QUERY COMPLETED for Chat room', offset);
							console.log(results[1])
							resolve(results[1].rows.raw())
						})
						.catch(err => {
							reject(err)
						})
				} else {
					txn.executeSql('select a.*, b.MAX_SEQUENCE, c.CONTACT_NAME as GROUP_NAME ' +
						'FROM ChatMessage a ' +
						'JOIN (select MAX(SEQUENCE) as MAX_SEQUENCE from ChatMessage) b ' +
						'LEFT OUTER JOIN Contact c ON c.JID = a.CREATOR_JID ' +
						'where a.CHAT_ROOM_JID ="' + JID + '" ORDER BY a._ID DESC LIMIT 20 OFFSET ' + offset)
						.then((results) => {
							console.log('QUERY COMPLETED for Chat room', offset);
							console.log(results[1])
							resolve(results[1].rows.raw())
						})
						.catch(err => {
							reject(err)
						})
				}
			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});
}


function getAllChatsGreaterThanEqual_ID(JID, _id, isgroupmsg) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {

				if (isgroupmsg == 0) {
					txn.executeSql('select * FROM ChatMessage JOIN (select MAX(SEQUENCE) as MAX_SEQUENCE from ChatMessage) where CHAT_ROOM_JID = ? AND _ID >= ? ORDER BY _ID DESC', [JID, _id])
						.then((results) => {
							console.log(' f(getAllChatsGreaterThanEqual_ID) QUERY COMPLETED for Chat room', JID);
							console.log(results[1])
							// let chats = []
							// for(let i=0;i<results.rows.length;i++){
							// 	chats.push(results.rows.item(i))
							// }
							resolve(results[1].rows.raw())
						})
						.catch(err => {
							reject(err)
						})
				} else {

					txn.executeSql('select a.*, b.MAX_SEQUENCE, c.CONTACT_NAME as GROUP_NAME FROM ChatMessage a ' +
						'JOIN (select MAX(SEQUENCE) as MAX_SEQUENCE from ChatMessage) b ' +
						'LEFT OUTER JOIN Contact c ON c.JID = a.CREATOR_JID ' +
						'where a.CHAT_ROOM_JID = ? AND a._ID >= ? ORDER BY a._ID DESC', [JID, _id])
						.then((results) => {
							console.log(' f(getAllChatsGreaterThanEqual_ID) QUERY COMPLETED for Chat room', JID);
							console.log(results[1])
							// let chats = []
							// for(let i=0;i<results.rows.length;i++){
							// 	chats.push(results.rows.item(i))
							// }
							resolve(results[1].rows.raw())
						})
						.catch(err => {
							reject(err)
						})

				}

			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});
}

function getChatList() {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				// txn.executeSql('select a._ID, a.MSG_TEXT, a.MSG_TYPE, b.UNREAD_COUNT, b.LAST_MSG_CREATED_TIME, a.CHAT_ROOM_JID, a.IS_GROUP_MSG, c.JID, c.SMALL_IMAGE, c.PHONEBOOK_CONTACT_NAME, c.CONTACT_NAME, c.JEWELCHAT_ID, c.IS_PHONEBOOK_CONTACT'
				// 	+ ' from ChatMessage a '
				// 	+ 'INNER JOIN ( '
				// 	+ 'select _ID, max(_ID) as MAX_ID, count(_ID) as UNREAD_COUNT, max(TIME_CREATED) as LAST_MSG_CREATED_TIME'
				// 	+ ' from ChatMessage'
				// 	+ ' where IS_READ = 0 AND SENDER_MSG_ID IS NOT NULL'
				// 	+ ' group by CHAT_ROOM_JID'
				// 	+ ' ) b ON a._ID = b.MAX_ID'
				// 	+ ' LEFT OUTER JOIN Contact c ON c.JID = a.CHAT_ROOM_JID '
				// 	+ ' order by b.LAST_MSG_CREATED_TIME DESC')

				//'select a._ID, a.MSG_TEXT , a.MSG_TYPE, a.UNREAD_COUNT, a.LAST_MSG_CREATED_TIME, a.CHAT_ROOM_JID, a.IS_GROUP_MSG, c.JID, c.SMALL_IMAGE, c.PHONEBOOK_CONTACT_NAME, c.CONTACT_NAME, c.JEWELCHAT_ID, c.IS_PHONEBOOK_CONTACT '

					txn.executeSql('select b._ID, b.MSG_TEXT , b.MSG_TYPE, d.UNREAD_COUNT, b.LAST_MSG_CREATED_TIME, b.CHAT_ROOM_JID, b.IS_GROUP_MSG, c.JID, c.SMALL_IMAGE, c.PHONEBOOK_CONTACT_NAME, c.CONTACT_NAME, c.JEWELCHAT_ID, c.IS_PHONEBOOK_CONTACT '
					+ ' from ('					
					+ '( select _ID, MSG_TEXT, MSG_TYPE, CHAT_ROOM_JID, IS_GROUP_MSG, max(TIME_CREATED) as LAST_MSG_CREATED_TIME '
					+ ' from ChatMessage '					
					+ ' group by CHAT_ROOM_JID '
					+ ' ) b '
					+ 'LEFT OUTER JOIN '
					+ '( select CHAT_ROOM_JID, count(_ID) as UNREAD_COUNT '
					+ ' from ChatMessage '
					+ ' where IS_READ = 0 AND SENDER_MSG_ID IS NOT NULL '
					+ ' group by CHAT_ROOM_JID'
					+ ' ) d '
					+ ' ON b.CHAT_ROOM_JID = d.CHAT_ROOM_JID ) '
					+ ' LEFT OUTER JOIN Contact c ON c.JID = b.CHAT_ROOM_JID '
					+ ' order by b.LAST_MSG_CREATED_TIME DESC')
					.then((results) => {
						console.log('Contact query COMPLETED for');
						console.log(results[1].rows.raw());
						let chatlist = results[1].rows.raw();
						// for(let i=0;i<results.rows.length;i++){
						// 	chatlist.push(results.rows.item(i))
						// }
						resolve(chatlist)
					})
					.catch(err => {
						reject(err)
					})
			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});
}

function getContactList( type, query ) {
	
	let Query
	if (type === 'Forward')
		Query = 'Select * from Contact where IS_REGIS=1';
	else if(type === 'Contact' && query )
		Query = "Select * from Contact where IS_PHONEBOOK_CONTACT=1 AND IS_GROUP=0 AND ( PHONEBOOK_CONTACT_NAME LIKE '%" +query+ "%' OR CONTACT_NUMBER LIKE '%"+query+"%' ) ORDER BY PHONEBOOK_CONTACT_NAME ASC"; //IS_REGIS DESC,
	else
		Query = 'Select * from Contact where IS_PHONEBOOK_CONTACT=1 AND IS_GROUP=0 ORDER BY IS_REGIS DESC, PHONEBOOK_CONTACT_NAME ASC';

	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				txn.executeSql(Query)
					.then((results) => {
						console.log('Contact query COMPLETED for');
						console.log(results[1].rows.raw())
						resolve(results[1].rows.raw())
					})
					.catch(err => {
						reject(err)
					})
			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});
}

function checkIfRowExist(JID) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				txn.executeSql('Select * from Contact where JID="' + JID + '"')
					.then((results) => {
						console.log('Contact query COMPLETED for');
						console.log(results[1])
						resolve(results[1])
					})
					.catch(err => {
						reject(err)
					})
			})
		}).then(result => {
		}).catch(err => {
			reject(err)
		})
	});
}

// var incomingMessage = {
// 	CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
// 	IS_GROUP_MSG: IS_GROUP_MSG,
// 	MSG_TEXT: message,
// 	CREATOR_JID: msg.getAttribute('from').split('/')[0],
// 	GROUP_MEMBER_JID: (IS_GROUP_MSG == 1 ? msg.getAttribute('from').split('/')[1] : msg.getAttribute('from').split('/')[0]),
// 	JEWEL_TYPE: parseInt(jewelType),
// 	CREATED_DATE: createdDateTime.date,
// 	CREATED_TIME: createdDateTime.time,
// 	TIME_CREATED: createdDateTime.fulltime,
// 	SENDER_MSG_ID: msg.getAttribute('id'),
// 	MSG_TYPE: ( media ? ( parseInt(media[0].getAttribute('number')) ) : 0 ),
// 	MEDIA_CLOUD: (media ? (Strophe.getText(media[0])) : null ),
// 	SEQUENCE: -1,
// 	IS_REPLY: reply,
// 	IS_FORWARD: forward,
// 	REPLY_PARENT: parent
// }

function insertStropheChatData(data) {
	//select last_insert_rowid()
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql; let q = ',?'
				sql = "INSERT INTO ChatMessage "
					+ "( " + Object.keys(data).join(', ') + " ) "
					+ " VALUES (?" + q.repeat(Object.keys(data).length - 1) + ")";
				console.log('INSERT MESSAGE SQL ', sql, Object.values(data))
				txn.executeSql(sql, Object.values(data))
					.then((results) => {
						console.log('ChatMessage insert Query COMPLETED for');
						console.log(results[1].insertId)
						resolve(results[1].insertId)
					}).catch(err => {
						console.log('INSERT MESSAGE SQL ERROR', err ) 
						reject(err)
					})
			})
		}).then(result => {
			console.log('INSERT Successful:', result)
		}).catch(error => {
			console.log('INSERT ERROR:', err)
			reject(error)
		})
	})
}

// let affiliationMessage = {
// 	CHAT_ROOM_JID: msg.getAttribute('from').split('/')[0],
// 	IS_GROUP_MSG: 1,
// 	MSG_TEXT: affiliationText,
// 	CREATOR_JID: msg.getAttribute('from').split('/')[0],
// 	SENDER_MSG_ID: msg.getAttribute('id'),		
// 	CREATED_DATE: createdDateTime.date,
// 	CREATED_TIME: createdDateTime.time,
// 	TIME_CREATED: createdDateTime.fulltime,		
// 	MSG_TYPE: -1		
// }

function insertAffiliations(data) {

	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				sql = "INSERT INTO ChatMessage "
					+ "( " + Object.keys(data).join(', ') + " ) "
					+ " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				console.log(sql);
				txn.executeSql(sql, Object.values(data))
					.then((results) => {
						console.log('Affiliation insert Query COMPLETED for');
						console.log(results[1].insertId)
						resolve(results[1].insertId)
					}).catch(err => {
						reject(err)
					})
			})
		}).then(result => {
		}).catch(error => {
			reject(error)
		})
	})
}

function updatePickedJewel(id, flag) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				sql = "UPDATE ChatMessage SET IS_JEWEL_PICKED = " + flag + "  WHERE _ID =  " + id;
				console.log(sql)
				txn.executeSql(sql).then((results) => {
					console.log('Chat updated for picked Jewel');
					resolve('success')
				}).catch(err => {
					reject(err)
				})
			})
		}).then(result => {
			resolve('success')
		}).catch(error => {
			reject(error)
		})
	})
}


function updateReceivedDeliveryAndReadReceipt(type, id, time, CHAT_ROOM_JID) {
	console.log(type, id, time)
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				if (type === 'Delivery') {
					sql = "UPDATE ChatMessage SET IS_DELIVERED = 1, TIME_DELIVERED = " + time + " WHERE _ID =  " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Delivered Query updated for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Both') {
					sql = "UPDATE ChatMessage SET IS_READ = 1,TIME_READ=" + time + ", IS_DELIVERED = 1, TIME_DELIVERED = " + time + "  WHERE _ID =  " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Both Query COMPLETED for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Read') {
					sql = "UPDATE ChatMessage SET IS_READ = 1, TIME_READ = ? WHERE _ID <= ? AND CHAT_ROOM_JID LIKE ? AND CREATOR_JID NOT LIKE ? AND IS_DELIVERED = 1" 
					//sql = "UPDATE ChatMessage SET IS_READ = 1, TIME_READ = ? WHERE _ID = ?" 
					txn.executeSql(sql,[ time, id , CHAT_ROOM_JID, CHAT_ROOM_JID ]).then((results) => {
						console.log('ChatMessage READ Query updated for id');
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Submit') {
					sql = "UPDATE ChatMessage SET IS_SUBMITTED = 1,TIME_SUBMITTED=" + time + " WHERE _ID = " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Delivered Query updated for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
			}).then(result => {

			}).catch(error => {
				reject(error)
			})
		})
	})
}


function updateDeliveryAndReadReceipt(type, id, time, CHAT_ROOM_JID) {
	console.log(type, id, time)
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				if (type === 'Delivery') {
					sql = "UPDATE ChatMessage SET IS_DELIVERED = 1, TIME_DELIVERED = " + time + " WHERE _ID =  " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Delivered Query updated for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Both') {
					sql = "UPDATE ChatMessage SET IS_READ = 1,TIME_READ=" + time + ", IS_DELIVERED = 1, TIME_DELIVERED = " + time + "  WHERE _ID =  " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Both Query COMPLETED for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Read') {
					//sql = "UPDATE ChatMessage SET IS_READ = 1, TIME_READ = ? WHERE _ID = ? AND CHAT_ROOM_JID LIKE ? AND CREATOR_JID LIKE ? AND IS_READ = 0 AND IS_DELIVERED = 1" 
					sql = "UPDATE ChatMessage SET IS_READ = 1, TIME_READ = ? WHERE _ID = ?" 
					txn.executeSql(sql,[ time, id ]).then((results) => {
						console.log('ChatMessage READ Query updated for id');
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
				else if (type === 'Submit') {
					sql = "UPDATE ChatMessage SET IS_SUBMITTED = 1,TIME_SUBMITTED=" + time + " WHERE _ID = " + id
					txn.executeSql(sql).then((results) => {
						console.log('ChatMessage Delivered Query updated for id, ', id);
						resolve('success')
					}).catch(err => {
						reject(err)
					})
				}
			}).then(result => {

			}).catch(error => {
				reject(error)
			})
		})
	})
}

function updateBulkReadReceipt(CHAT_ROOM_JID, id, time) {
	console.log('UPDATE BULK READ RECEIPT', CHAT_ROOM_JID, id, time)
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
					let sql;		
					sql = "UPDATE ChatMessage SET IS_READ = 1, TIME_READ= ? WHERE _ID <= ? AND CHAT_ROOM_JID LIKE ? AND CREATOR_JID LIKE ? AND IS_READ = 0"
					txn.executeSql(sql, [time, id ,CHAT_ROOM_JID, CHAT_ROOM_JID ]).then((results) => {
						console.log('updateBulkReadReceipt....Row affected ', results[1].rows.length);
						resolve('success')
					}).catch(err => {
						reject(err)
					})				
				
			}).then(result => {

			}).catch(error => {
				reject(error)
			})
		})
	})
}


function getHighestNotReadMsgID(CHAT_ROOM_JID, myjid) {
	console.log('getHighestNotReadMsgID',CHAT_ROOM_JID, myjid);
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
					let sql;		
					sql = "select _ID AS MAX_ID, SENDER_MSG_ID from ChatMessage WHERE CHAT_ROOM_JID LIKE ? AND CREATOR_JID NOT LIKE ? AND IS_READ=0 AND SENDER_MSG_ID IS NOT NULL ORDER BY _ID DESC"
					txn.executeSql(sql, [ CHAT_ROOM_JID, myjid ]).then((results) => {
						console.log('getHighestNotReadMsgID....', results[1].rows.raw())
						resolve(results[1].rows.raw())
					}).catch(err => {
						reject(err)
					})				
				
			}).then(result => {

			}).catch(error => {
				reject(error)
			})
		})
	})
}



function selectUnreadMessages(JID) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				sql = "SELECT * FROM ChatMessage WHERE CHAT_ROOM_JID ='" + JID + "' AND CREATOR_JID='" + JID + "' AND IS_READ = 0"
				console.log(sql)
				txn.executeSql(sql).then((results) => {
					console.log('Unread messages Query COMPLETED for');
					console.log(results[1])
					resolve(results[1])
				}).catch(err => {
					reject(err)
				})
			})
		}).then(result => {
		}).catch(error => {
			reject(error)
		})
	})
}

function selectUnsendMessages(JID) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				sql = "SELECT * FROM ChatMessage WHERE CREATOR_JID='" + JID + "' AND IS_SUBMITTED = 0"
				console.log(sql)
				txn.executeSql(sql).then((results) => {
					console.log('Unsend messages Query COMPLETED for');
					console.log(results[1])
					resolve(results[1])
				}).catch(err => {
					reject(err)
				})
			})
		}).then(result => {
		}).catch(error => {
			reject(error)
		})
	})
}

function updateLastMessageAndText(message, createdDateTime, messageType) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql;
				if (messageType === 'Active') {
					sql = "UPDATE Contact SET LAST_MSG_CREATED_TIME =" + createdDateTime + ", MSG_TEXT = '" + message.MSG_TEXT + "', MSG_TYPE= " + message.MSG_TYPE + ", UNREAD_COUNT = " + 0 + " WHERE JID = '" + message.CHAT_ROOM_JID + "'"
				}
				else {
					sql = "UPDATE Contact SET LAST_MSG_CREATED_TIME =" + createdDateTime + ", MSG_TEXT = '" + message.MSG_TEXT + "', MSG_TYPE= " + message.MSG_TYPE + ", UNREAD_COUNT = UNREAD_COUNT +" + 1 + " WHERE JID = '" + message.CHAT_ROOM_JID + "'"
				}
				txn.executeSql(sql).then((results) => {
					console.log('ChatMessage contact update Query COMPLETED for id, ');
					resolve('success')
				}).catch(err => {
					reject(err)
				})
			})
		}).then(result => {

		}).catch(error => {
			reject(error)
		})
	})
}


// data = {
// 	JID: message.CHAT_ROOM_JID,
// 	CONTACT_NUMBER: message.CHAT_ROOM_JID.split('@')[0],
// 	CONTACT_NAME: message.IS_GROUP === 1 ? 'New Group' : null,
// 	IS_PHONEBOOK_CONTACT: 0,
// 	PHONEBOOK_CONTACT_NAME: null,
// 	IS_REGIS: 1,
// 	IS_GROUP: message.IS_GROUP_MSG
// }

function insertContactData(data) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {

				let q = ',?';
				let sql = "INSERT INTO Contact " +
					" ( "+Object.keys(data).join(",") + " ) " + 
					//" (JID, CONTACT_NUMBER, CONTACT_NAME, IS_PHONEBOOK_CONTACT, PHONEBOOK_CONTACT_NAME, IS_REGIS) " +
					" VALUES ( ? " + q.repeat(Object.keys(data).length - 1) + " ) ";
					//" VALUES (" + _handleString(data.JID) + "," + _handleString(data.CONTACT_NUMBER) + ", " + _handleString(data.CONTACT_NAME) + ", " + data.IS_PHONEBOOK_CONTACT + "," + _handleString(data.PHONEBOOK_CONTACT_NAME) + "," + data.IS_REGIS + ") "
				txn.executeSql(sql, Object.values(data) ).then(val => {
					resolve('Success')
				}).catch(err => {
					console.log('reject')
					reject(err)
				})
			}).catch(err => {
				//console.log('reject1')
				reject(err)
			})
		})
	})
}

function updatePhoneContact(contactData) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql = "UPDATE Contact SET PHONEBOOK_CONTACT_NAME=" + _handleString(contactData.PHONEBOOK_CONTACT_NAME) + ", IS_PHONEBOOK_CONTACT = 1  WHERE CONTACT_NUMBER=" + contactData.CONTACT_NUMBER;
				txn.executeSql(sql).then(result => {
					resolve('success')
					console.log('success Contact update')
				}).catch(err => {
					reject('fail')
					console.log('fail Contact update')
				})
			}).catch(err => {
				reject('fail')
				console.log('fail Contact update')
			})
		})
	})
}

function updateContact(contactData, CONTACT_NUMBER) {
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {				

				let sql = "UPDATE Contact SET " + Object.keys(contactData).join(' = ?, ') + ' = ? ' + ' WHERE CONTACT_NUMBER=' + CONTACT_NUMBER;				

				console.log('UPDATE CONTACT SQL', sql);

				// let sql = "UPDATE Contact SET JEWELCHAT_ID = " + contactData.id + ", SMALL_IMAGE=" + _handleString(contactData.pic) + ", IMAGE_PATH=" + _handleString(contactData.large_pic) + "," +
				// 	"CONTACT_NAME=" + _handleString(contactData.name) + ",STATUS_MSG=" + _handleString(contactData.status) + ", IS_INVITED=" + contactData.invited + ", IS_REGIS=" + contactData.regis + " WHERE CONTACT_NUMBER=" + contactData.phone;
				txn.executeSql(sql, Object.values(contactData)).then(result => {
					resolve('success')
					console.log('success Contact update')
				}).catch(err => {
					reject('fail')
					console.log('fail Contact update')
				})
			}).catch(err => {
				reject('fail')
				console.log('fail Contact update')
			})
		})
	})
}

function _handleString(value) {
	if (value == 'null' || value == 'undefined' || value == null || value == '') {
		return null
	}
	else
		return "'" + value + "'"
}

// function insertTeamJC(data) {
// 	return new Promise((resolve, reject) => {
// 		_initDb().then(instance => {
// 			jcdb = instance;
// 			jcdb.transaction((txn) => {
// 				let sql = "INSERT INTO Contact " +
// 					" (JEWELCHAT_ID, JID, CONTACT_NUMBER, ,IS_PHONEBOOK_CONTACT , PHONEBOOK_CONTACT_NAME, IS_REGIS, LAST_MSG_CREATED_TIME,MSG_TEXT,UNREAD_COUNT) " +
// 					" VALUES ( " + _handleString(data.JEWELCHAT_ID)+ "," + _handleString(data.JID) + "," + _handleString(data.CONTACT_NUMBER) + ", " + data.IS_PHONEBOOK_CONTACT + "," + _handleString(data.PHONEBOOK_CONTACT_NAME) + "," + data.IS_REGIS + "," + data.LAST_MSG_CREATED_TIME + "," + _handleString(data.MSG_TEXT) + "," + data.UNREAD_COUNT + ") "
// 				txn.executeSql(sql).then(val => {
// 					resolve('Success')
// 				}).catch(err => {
// 					console.log('reject')
// 					reject(err)
// 				})
// 			}).catch(err => {
// 				console.log('reject1')
// 				reject(err)
// 			})
// 		})
// 	})
// }


function insertTeamJC(data) {
	//select last_insert_rowid()
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql; let q = ',?'
				sql = "INSERT INTO Contact "
					+ "( " + Object.keys(data).join(', ') + " ) "
					+ " VALUES (?" + q.repeat(Object.keys(data).length - 1) + ")";

				txn.executeSql(sql, Object.values(data))
					.then((results) => {
						console.log('ChatMessage insert Query COMPLETED for');
						console.log(results[1].insertId)
						resolve(results[1].insertId)
					}).catch(err => {
						reject(err)
					})
			})
		}).then(result => {
		}).catch(error => {
			reject(error)
		})
	})
}


function deleteAllData(){
	return new Promise((resolve, reject) => {
		_initDb().then(instance => {
			jcdb = instance;
			jcdb.transaction((txn) => {
				let sql1 = "Delete from Contact";
				let sql2 = "Delete from ChatMessage";
				txn.executeSql(sql1);				
				txn.executeSql(sql2);				
			})
			.then( val => {
				console.log('Delete all data successful')
				console.log(val)
				resolve('Success')
			})
			.catch(err => {
				console.log('reject1')
				reject(err)
			})
		})
	})
}



const contactData = [
	{
		_ID: 1,
		JEWELCHAT_ID: 1,
		JID: '2@jewelchat.net',
		CONTACT_NUMBER: 919700000000,
		CONTACT_NAME: 'Team JewelChat',
		PHONEBOOK_CONTACT_NAME: 'Team JewelChat',
		IS_GROUP: 0,
		STATUS_MSG: 'Keep Collecting',
		IS_REGIS: 1,
		IS_GROUP_ADMIN: 0,
		IS_INVITED: null,
		IS_BLOCKED: 0,
		IS_PHONEBOOK_CONTACT: 0,
		UNREAD_COUNT: 0,
		SMALL_IMAGE: null,
		IMAGE_PATH: 'https://parthaprofiles.s3.ap-south-1.amazonaws.com/9005835708_pic.png',
		LAST_MSG_CREATED_TIME: '1569819266669',
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World'
	},
]

const chatList = [
	{
		_ID: 1,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-14',
		CREATED_TIME: '16:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 2,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-14',
		CREATED_TIME: '14:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 3,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-14',
		CREATED_TIME: '12:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 4,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-13',
		CREATED_TIME: '16:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 5,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-13',
		CREATED_TIME: '14:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 6,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-13',
		CREATED_TIME: '12:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 7,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835709@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-13',
		CREATED_TIME: '10:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 8,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World',
		CREATED_DATE: '2020-01-12',
		CREATED_TIME: '12:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 9,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835708@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World Well organized and easy to understand Web building tutorials with lots of examples',
		CREATED_DATE: '2020-01-12',
		CREATED_TIME: '10:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	},
	{
		_ID: 10,
		CHAT_ROOM_JID: '919005835708@jewelchat.net',
		CREATOR_JID: '919005835709@jewelchat.net',
		SENDER_NAME: 'mayukh',
		SENDER_MSG_ID: 1,
		IS_GROUP_MSG: 0,
		MSG_TYPE: 1,
		MSG_TEXT: 'Hello World ',
		CREATED_DATE: '2020-01-12',
		CREATED_TIME: '08:00:00',
		JEWEL_TYPE: 3,
		IS_JEWEL_PICKED: 0,
		IS_SUBMITTED: 1,
		TIME_SUBMITTED: '',
		IS_READ: 0,
		TIME_READ: '',
		IS_DELIVERED: 0,
		TIME_DELIVERED: '',
		IS_ERROR: 0,
		IMAGE_BLOB: null,
		IS_IMAGE_DOWNLOADED: 0,
		IS_IMAGE_UPLOADED: 0,
		IMAGE_PATH_LOCAL: null,
		IMAGE_PATH_CLOUD: null,
		VIDEO_BLOB: null,
		IS_VIDEO_DOWNLOADED: 0,
		IS_VIDEO_UPLOADED: 0,
		VIDEO_PATH_LOCAL: null,
		VIDEO_PATH_CLOUD: null
	}
]


// export default {
//   jcdb,
//   openDatabaseConnection,
//   createDatabaseTables
// }

/*
export const initLocalDatabase = () => {

	return (dispatch, getState) => {

		//console.log('GET STATE');
		//console.log(getState());

		dispatch({ type: 'INIT_DATABASE_START' })

		SQLite.openDatabase({
			name: 'jewelchat.db',
			version: '1.0'
		})
		.then(instance => {

			jcdb = instance;

			jcdb.transaction((txn) => {
				console.log('SQL')
				console.log(SQL.Create_Contact)

				let queries = [];

				let q = txn.executeSql(SQL.Create_Contact);
				queries.push(q);

				q = txn.executeSql(SQL.Create_ChatMessage);
				queries.push(q);

				Promise.all(queries).then( val => {
					console.log('PROMISE ALL')
					console.log(val)
					dispatch({ type: 'INIT_DATABASE_DONE', payload: { dbInit: 'DONE' } })
				}).catch( err => {
					throw err;
				})


			}).then((result) =>{
			  console.log('Result:'+ result);
			}).catch((err) => {
				throw err;
			})



		})
		.catch( err => {
			dispatch({ type: 'INIT_DATABASE_ERROR', payload: { dbInit: 'FAILED' } })
		});

	}


}



function listProduct() {
	return new Promise((resolve) => {
		const products = [];
		this.initDB().then((db) => {
			db.transaction((tx) => {
				tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage FROM Product p', []).then(([tx, results]) => {
					console.log("Query completed");
					var len = results.rows.length;
					for (let i = 0; i < len; i++) {
						let row = results.rows.item(i);
						console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
						const { prodId, prodName, prodImage } = row;
						products.push({
							prodId,
							prodName,
							prodImage
						});
					}
					console.log(products);
					resolve(products);
				});
			}).then((result) => {
				this.closeDatabase(db);
			}).catch((err) => {
				console.log(err);
			});
		}).catch((err) => {
			console.log(err);
		});
	});
}

*/