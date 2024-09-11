import { SET_USER_ACHIEVEMENT_DATA } from '../actions/ActionTypes'

let initialState = {
    userachivements: []
}

const achievements = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ACHIEVEMENT_DATA:
            return {
                ...state,
                userachivements: action.payload
            }
        default:
            return state

    }
}

export default achievements