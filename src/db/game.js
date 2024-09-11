import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Rest from '../network/rest'


export const gameDataLoad = () => {

    return (dispatch, getState) => {

        dispatch({ type: 'GAMEDATA_LOAD_START' })

        AsyncStorage.getItem('game')
        .then( game => {
            let curr_date = new Date();

            if(game == null){
                dispatch({ type: 'GAMEDATA_NETWORK_LOAD_START'})
                Rest.gameDataLoad()
                .then( gamestate => {
                    dispatch({ type: 'GAMEDATA_LOAD_DONE', payload: gamestate }) 
                })
                .catch( err => {
                    throw err
                })     
            }else if(curr_date - game.expiration_date < 86400000){
                dispatch({ type: 'GAMEDATA_LOAD_DONE', payload: game })
            }else if(curr_date - game.expiration_date >= 86400000){
                dispatch({ type: 'GAMEDATA_LOAD_DONE', payload: game })

                dispatch({ type: 'GAMEDATA_NETWORK_LOAD_START'})
                Rest.gameDataLoad()
                .then( gamestate => {
                    dispatch({ type: 'GAMEDATA_LOAD_DONE', payload: gamestate }) 
                })
                .catch( err => {
                    throw err
                })
            }            
               
        })
        .catch( err => {
            dispatch({ type: 'GAMEDATA_LOAD_ERROR', payload: err })  
        })       
        

    }
}