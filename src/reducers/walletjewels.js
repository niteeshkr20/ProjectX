import { SET_WALLET_JEWELS, SET_WALLET_JEWELS_IS_LOADING } from '../actions/ActionTypes'

let initialState = {
    "prices": [],
    "networkLoading": false
}

const walletjewels = (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET_JEWELS:
            return {
                ...state,
                prices: action.payload
            }
        case SET_WALLET_JEWELS_IS_LOADING:
            return {
                ...state,
                networkLoading: action.payload
            }
        default:
            return state
    }
}

export default walletjewels