import {jcdb} from "../db/localdatabase"
import SQL from "../db/queries"
import SQLite from 'react-native-sqlite-storage';

export const initLocalDatabase = () => {

    return (dispatch, getState) => {
        //console.log('GET STATE');
        //console.log(getState());
        dispatch({ type: 'INIT_DATABASE_START' })
        SQLite.openDatabase({
            name: 'jewelchat.db',
            version: '1.0'
        })
        .then(instance => {

            jcdb = instance;

            jcdb.transaction((txn) => {
                console.log('SQL')
                console.log(SQL.Create_Contact)
                let queries = [];
                let q = txn.executeSql(SQL.Create_Contact);
                queries.push(q);                                   
                q = txn.executeSql(SQL.Create_ChatMessage);
                queries.push(q);

                Promise.all(queries).then( val => {
                    console.log('PROMISE ALL')
                    console.log(val)
                    dispatch({ type: 'INIT_DATABASE_DONE', payload: { dbInit: 'DONE' } })
                }).catch( err => {                                           
                    throw err;
                })
            }).then((result) =>{  
              console.log('Result:'+ result);                  
            }).catch((err) => {
                throw err;
            })
        })
        .catch( err => {                
            dispatch({ type: 'INIT_DATABASE_ERROR', payload: { dbInit: 'FAILED' } })
        });
    }
}