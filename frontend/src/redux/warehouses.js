import * as ActionTypes from './ActionTypes';

export const Warehouses = (state = {
        errMess: null,
        warehouses: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_WAREHOUSE:
            return {...state, isLoading: false, errMess: null, warehouses: action.payload};

        case ActionTypes.WAREHOUSE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, warehouses: []};

        case ActionTypes.EDIT_WAREHOUSE:
            var comment = action.payload;
            return {...state, warehouses: state.warehouses.concat(comment)};

        default:
            return state;
    }
}