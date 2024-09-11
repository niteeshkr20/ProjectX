import axios from 'axios';
import Constants from './rest';
import { store } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
/**
 * Create an Axios Client with defaults
 */
console.log('NetWork Util loaded')
const client = axios.create({
    timeout: Constants.TIMEOUT_DURATION,
});

/**
 * Request Wrapper with default success/error actions
 */
const NetworkUtil = async function (options, requireAuth) {
    console.log(store.getState())
    if (store.getState().network.networkIsConnected) {
        if (requireAuth) {
            client.defaults.baseURL = Constants.baseURL;
            client.defaults.headers.common['Authorization'] = 'Bearer ' + store.getState().mytoken.cookie
            client.defaults.headers.common['Accept'] = "application/json"
            client.defaults.headers.common['Content-Type'] = "application/json"
        }

        console.log(options)
        const onSuccess = function (response) {
            console.log('Response status: ', response.status);
            console.log('Response headers: ', response.headers);
            return Promise.resolve(response.data);
        }

        const onError = function (error) {
            console.log(error.message, error.response.status)
            //console.log('Request Failed: ', JSON.stringify(error));
            if (error.response.status == 401) {
                console.log(Constants.baseURL + Constants.getAccessToken)
                axios.post(Constants.baseURL + Constants.getAccessToken,
                    { "refreshToken": store.getState().mytoken.token }
                ).then(response => {
                    let myTokens = {
                        myid: store.getState().mytoken.myid,
                        myphone: store.getState().mytoken.myphone,
                        cookie: response.data.accessToken,
                        token: store.getState().mytoken.token
                    };
                    console.log(myTokens)

                    AsyncStorage.multiSet([['myid', myTokens.myid + ''], ['myphone', myTokens.myphone], ['token', myTokens.token], ['cookie', myTokens.cookie]])
                        .then(() => {
                            store.dispatch(({ type: 'USER_TOKEN_LOADED', myTokens }));
                        })
                    console.log(response)
                }).catch(error => {
                    //handle logout flow
                    console.log(error)
                })
            }
            return Promise.reject(error);
        }

        return client(options)
            .then(onSuccess)
            .catch(onError)
    }

}

export default NetworkUtil;