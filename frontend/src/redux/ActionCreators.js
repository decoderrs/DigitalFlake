import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addWarehouses = (country) => ({
    type: ActionTypes.ADD_WAREHOUSE,
    payload: country
});

export const postWarehouse = (warehouseId, warehouseName, city, state) => (dispatch) => {

    const newWarehouse = {
        
        warehouseId: warehouseId,
        warehouseName: warehouseName,
        city: city,
        state: state,
    }
    console.log('Warehouse ', newWarehouse);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'warehouse', {
        method: 'POST',
        body: JSON.stringify(newWarehouse),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addWarehouse(response)))
        .catch(error => {
            console.log('Post warehouse ', error.message);
            alert('warehouse details could not be posted\nError: ' + error.message);
        })
}

export const warehouseLoading = () => ({
    type: ActionTypes.WAREHOUSE_LOADING
})

export const warehouseFailed = (errmess) => ({
    type: ActionTypes.WAREHOUSE_FAILED,
    payload: errmess
})

export const fetchWarehouses = (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'warehouse')
        .then(response => {
            console.log('warehouse', response);
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(warehouse => dispatch(addWarehouses(warehouse)))
        .catch(error => dispatch(warehouseFailed(error.message)));
}