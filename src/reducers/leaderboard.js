import { SET_LEADERBOARD } from '../actions/ActionTypes'
let initialState = {
    leaderboard: {}
}

const leaderboard = (state = initialState, action) => {
    switch (action.type) {
        case SET_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.payload
            }
        default:
            return state
    }
}

export default leaderboard