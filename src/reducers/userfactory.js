import { SET_USER_FACTORY, IS_LOADING } from '../actions/ActionTypes'

let initialState = {
    factoryuser: [],
    isLoading: false
}


const userfactory = (state = initialState, action) => {    
    switch (action.type) {
        case SET_USER_FACTORY:
            return {
                ...state,
                factoryuser: action.payload.factoryuser
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default userfactory