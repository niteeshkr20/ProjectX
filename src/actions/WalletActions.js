import { SET_WALLET_JEWELS,SET_WALLET_JEWELS_IS_LOADING } from "./ActionTypes"
import NetworkManager from "../network/NetworkManager"
import rest from "../network/rest"

export const setWalletJewels = (payload) => {
    return {
        type: SET_WALLET_JEWELS,
        payload: payload
    }
}

export const setWalletLoading = (payload) => {
    return {
        type: SET_WALLET_JEWELS_IS_LOADING,
        payload: payload
    }
}

export const getWalletJewels = () => {
    return (dispatch, getState) => {
        dispatch(setWalletLoading(true))
        NetworkManager.callAPI(rest.getWalletJewelPrices, 'GET', null).then(result => {
            dispatch(setWalletJewels(result.prices))
            dispatch(setWalletLoading(false))
        }).catch(error => {

        })
    }
}