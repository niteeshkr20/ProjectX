import { LOAD_GAME_STATE, SET_TASK_DATA, SET_TASK_DETAILS, SET_LEADERBOARD,
    SET_GIFT_TASK_DATA, EMPTY_GIFT_TASK_DATA, SET_GIFT_TASK_DETAILS, SET_USER_GIFT_TASK } from './ActionTypes'
import NetworkManager from '../network/NetworkManager'
import rest from '../network/rest'

export const loadGameState = () => {
    console.log('test came')
    return (dispatch, getState) => {
        console.log('test came1')
        NetworkManager.callAPI(rest.getGameState, 'GET', null).then(response => {
            console.log(response)
            dispatch({ type: LOAD_GAME_STATE, payload: response })
        }).catch(error => {
            console.log(error)
        })
    }
}

export const setTaskData = (payload) => {
    return {
        type: SET_TASK_DATA,
        payload: payload
    }
}

export const setTaskDetails = (payload) => {
    console.log('payload')
    console.log(payload)
    return {
        type: SET_TASK_DETAILS,
        payload: payload
    }
}

export const setGiftTaskData = (payload) => {
    return {
        type: SET_GIFT_TASK_DATA,
        payload: payload
    }
}

export const emptyGiftTaskData = () => {
    return {
        type: EMPTY_GIFT_TASK_DATA,
        payload: []
    }
}

export const setGiftTaskDetails = (payload) => {
    return {
        type: SET_GIFT_TASK_DETAILS,
        payload: payload
    }
}



export const setLeaderBoard = (payload) => {
    return {
        type: SET_LEADERBOARD,
        payload: payload
    }
}

export const setUserGiftTask = (payload) => {
    return {
        type: SET_USER_GIFT_TASK,
        payload: payload
    }
}








