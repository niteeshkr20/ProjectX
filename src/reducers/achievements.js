import { SET_ACHIEVEMENT_DATA } from '../actions/ActionTypes';

let initialState = {
    achievements: []
}

const achievements = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACHIEVEMENT_DATA:
            return {
                ...state,
                achievements: action.payload
            }
        default:
            return state
    }
}

export default achievements