

let initialState = {
    xmppState: 'XMPP_DISCONNECTED',
    networkType: 'none',        
    networkIsConnected: false    
}
    
    

        
const network = (state = initialState, action) => {
    //console.log('>>>>>>>>>>'+action.type);
    switch (action.type) {
        case 'NETWORK_STATE_CHANGE': 
            return Object.assign({}, state, { networkType: action.payload.type, networkIsConnected: action.payload.isConnected }) 
        case 'XMPP_CONNECTING': 
            return Object.assign({}, state, { xmppState: 'XMPP_CONNECTING' }) 
        case 'XMPP_CONNECTION_FAIL': 
            return Object.assign({}, state, { xmppState: 'XMPP_CONNECTION_FAIL' }) 
        case 'XMPP_AUTHENTICATING': 
            return Object.assign({}, state, { xmppState: 'XMPP_AUTHENTICATING' }) 
        case 'XMPP_AUTH_FAILURE': 
            return Object.assign({}, state, { xmppState: 'XMPP_AUTH_FAILURE' }) 
        case 'XMPP_DISCONNECTING': 
            return Object.assign({}, state, { xmppState: 'XMPP_DISCONNECTING' }) 
        case 'XMPP_DISCONNECTED': 
            return Object.assign({}, state, { xmppState: 'XMPP_DISCONNECTED' }) 
        case 'XMPP_CONNECTED': 
            return Object.assign({}, state, { xmppState: 'XMPP_CONNECTED' })                                    
        default:            
            return state        
    }
}

export default network