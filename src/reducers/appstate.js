
let initialState = {
    state: 'active'
}
    
    

        
const appstate = (state = initialState, action) => {
    switch (action.type) {
        case 'APP_STATE_CHANGE': 
            return Object.assign({}, state, { state: action.payload })     
        default:            
            return state        
    }
}

export default appstate;