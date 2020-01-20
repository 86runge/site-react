// redux
import {createStore, combineReducers, applyMiddleware} from 'redux';
// redux-persist
import {persistStore, persistReducer} from 'redux-persist';
import session from 'redux-persist/es/storage/session'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import * as nav from './manage-nav/reducer';
import * as menu from './manage-menu/reducer';

const persistConfig = {
    key: 'root', // 必须有的
    storage: session, // 缓存机制
    blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
    // whitelist: [], /// reducer 白名单，写在这里的数据才会缓存
};

const persistedReducer = persistReducer(persistConfig, combineReducers({...nav, ...menu}));
const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store
