import {SET_ACHIEVEMENT_DATA,SET_USER_ACHIEVEMENT_DATA} from './ActionTypes'
export const setAchievements = (payload) =>{
        return {
            type: SET_ACHIEVEMENT_DATA,
            payload: payload
        }
}

export const setUserAchievement = (payload) =>{
    return {
        type: SET_USER_ACHIEVEMENT_DATA,
        payload: payload
    }
}