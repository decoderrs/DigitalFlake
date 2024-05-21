import { Warehouses } from "./warehouses";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            warehouses: Warehouses
        }),

        applyMiddleware(thunk,logger)
    );

    return store;
}