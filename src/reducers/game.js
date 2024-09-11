import { LOAD_GAME_STATE } from "../actions/ActionTypes";

let initialState = {
    "scores": {},
    "jewels": []
}


const game = (state = initialState, action) => {    
    switch (action.type) {
        case LOAD_GAME_STATE:
            return {
                    ...state,
                    scores: action.payload.scores[0],
                    jewels: action.payload.jewels
            }

        case 'JEWEL_PICK': {
            console.log('JEWEL PICK', action.payload)
            return Object.assign({}, state, action.payload)
        }    
        /*
                case 'GAMEDATA_LOAD_DONE':            
                    action.payload.isDatabaseLoading = false
                    action.payload.isNetworkLoading = false
                    return Object.assign({}, state, action.payload) 
        
                case 'GAMEDATA_NETWORK_LOAD_START':            
                    return Object.assign({}, state, { isNetworkLoading: true }) 
        
                case 'GAMEDATA_LOAD_ERROR':            
                    return Object.assign({}, state, { isDatabaseLoading:false, isNetworkLoading:false }) 
                */
        default:
            return state
    }
}

export default game