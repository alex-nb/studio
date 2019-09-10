import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import checkTokenExpirationMiddleware from './utils/check-token';

const store = createStore(
    reducer,
    applyMiddleware(thunk, checkTokenExpirationMiddleware)
);

export default store;