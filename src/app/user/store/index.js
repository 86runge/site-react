import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-chunk';
import * as login from './login/reducer';

let store = createStore(
    combineReducers({...login}),
    applyMiddleware(thunk)
);

export default store;
