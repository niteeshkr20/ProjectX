import { SET_FACTORY, SET_USER_FACTORY, IS_LOADING } from './ActionTypes'
import NetworkManager from '../network/NetworkManager'
import rest from '../network/rest'

export const getFactory = () => {
    return (dispatch, setState) => {
        NetworkManager.callAPI(rest.getFactories, 'GET', null).then(result => {
            console.log(result)
            dispatch(setFactory(result))
        }).catch(error => {

        })
    }
}

export const setFactory = (payload) => {
    return {
        type: SET_FACTORY,
        payload: payload
    }
}

export const setUserFactory = (payload) => {
    return {
        type: SET_USER_FACTORY,
        payload: payload
    }
}
export const setIsLoading = (payload) =>{
    return {
        type: IS_LOADING,
        payload: payload
    }
}

export const getUserFactory = () => {

    return (dispatch, setState) => {
        dispatch(setIsLoading(true))
        NetworkManager.callAPI(rest.getUserFactory, 'POST', null).then(result => {
            console.log('userfactory result')
            console.log(result)
            dispatch(setUserFactory(result))
            dispatch(setIsLoading(false))
        }).catch(error => {
         console.log("error while getting user factory")
        })
    }
}