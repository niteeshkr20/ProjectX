import { SET_FACTORY } from '../actions/ActionTypes';

let initialState = {
    "factory": [],
    "materials": []
}




const tasks = (state = initialState, action) => {
    switch (action.type) {
        case SET_FACTORY:
            return {
                ...state,
                factory: action.payload.factory,
                materials: action.payload.materials
            }
        default:
            return state
    }
}

export default tasks