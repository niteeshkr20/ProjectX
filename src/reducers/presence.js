import {SET_PRESENCE, SET_ACTIVITY } from '../actions/ActionTypes'

let initialState = {}
    

        
const presence = (state = initialState, action) => {
    //console.log('REDUCER');
    //console.log(action);
    switch (action.type) {           

        case SET_PRESENCE: 
            return Object.assign({}, state, action.presenceData)  
        
        case SET_ACTIVITY:{            
            let jids = Object.keys(action.presenceData);
            let val = Object.values(action.presenceData);
            for(let i = 0; i<jids.length; i++){
                if(state[jids[i]])
                    state[jids[i]] = val[i]
            }    
            return {...state};
        }

        default:            
            return state  
        
    }
}

export default presence