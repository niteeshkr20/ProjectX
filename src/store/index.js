import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { default as ReduxThunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import referralAchievement from '../reducers/referralAchievement'
var thunk = require('redux-thunk').default

const persistConfig = {
    // Root
    timeout: 0,
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: ['game','tasks','taskdetails','gifttasks', 'gifttaskdetails','usergifttasks', 'userachievements', 'achievements', 'factory', 'referralAchievement'],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, applyMiddleware(thunk))

let persistor = persistStore(store)

export {
    store,
    persistor,
};