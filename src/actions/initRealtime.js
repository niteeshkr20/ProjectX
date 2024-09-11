import XMPP from "../utilities/xmpp/strophe";
import {connection} from "../network/realtime"
import {jcdb} from "../db/localdatabase"


export const xmppConnect = (userToken) => {
	console.log('XMPP');
    return (dispatch, getState) => {

				dispatch({ type: 'XMPP_START_CONNECTING' });
				
				connection = new XMPP.Strophe.Connection(this.WEBSOCKET_SERVICE);
				
				connection.registerSASLMechanism = XMPP.Strophe.SASLXOAuth2;

				connection.connect('user1@jewelchat', userToken, () => {

						if(err){
							console.log('Error:'+err);
							dispatch({ type: 'XMPP_ERROR' });
						}

						if (status == Strophe.Status.CONNECTING) {
							console.log('Strophe is connecting.');
							dispatch({ type: 'XMPP_CONNECTING' });
						} else if (status == Strophe.Status.CONNFAIL) {
							console.log('Strophe failed to connect.');  
							dispatch({ type: 'XMPP_CONNECTIOn_FAIL' });      
						} else if (status == Strophe.Status.AUTHENTICATING) {
							console.log('Strophe is authenticating.');
							dispatch({ type: 'XMPP_AUTHENTICATING' });
						} else if (status == Strophe.Status.AUTHFAIL) {
							dispatch({ type: 'XMPP_AUTH_FAILURE' });
							console.log('Strophe is auth failure.');
						} else if (status == Strophe.Status.DISCONNECTING) {
							dispatch({ type: 'XMPP_DISCONNECTING' });
							console.log('Strophe is disconnecting.');
						} else if (status == Strophe.Status.DISCONNECTED) {
							dispatch({ type: 'XMPP_DISCONNECTED' });
							console.log('Strophe is disconnected.');        
						} else if (status == Strophe.Status.CONNECTED) {
							dispatch({ type: 'XMPP_CONNECTED' });
							console.log('Strophe is connected.');     
							connection.addHandler((msg)=>{


								

							}, null, 'message', null, null,  null);

							connection.send($pres().tree());						
							connection.roster.init(connection);

							console.log('Strophe is connected.');							
						}

				});
       
    }

}