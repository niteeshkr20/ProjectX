import XMPP from "../../utilities/xmpp/strophe";

const URL = 'wss://chat.jewelchat.net/ws-xmpp';
//const URL = 'ws://localhost:5280/ws-xmpp';

var options = { 'mechanisms': [XMPP.Strophe.SASLOAuthBearer, XMPP.Strophe.SASLPlain ] };

let connection = new XMPP.Strophe.Connection(URL, options);
//connection.registerSASLMechanism = XMPP.Strophe.SASLXOAuth2;
//connection.registerSASLMechanism = XMPP.Strophe.SASLOAuthBearer
// connection.rawInput = (data) => {
// 	console.log('XMPP RECV', data)
// };
// connection.rawOutput = (data) => {
// 	console.log('XMPP SENT', data)
// };

XMPP.Strophe.log = function (level, msg) {
	console.log('Strophe log ' + level, msg, (new Date()).toTimeString() );
};

export const getConnectionObj = () => {
	return connection;
}

