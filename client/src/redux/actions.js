// redux/actions.js

import axios from 'axios';

// Action types
export const FETCH_ADS_REQUEST = 'FETCH_ADS_REQUEST';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';

export const CREATE_AD_REQUEST = 'CREATE_AD_REQUEST';
export const CREATE_AD_SUCCESS = 'CREATE_AD_SUCCESS';
export const CREATE_AD_FAILURE = 'CREATE_AD_FAILURE';

export const UPDATE_AD_REQUEST = 'UPDATE_AD_REQUEST';
export const UPDATE_AD_SUCCESS = 'UPDATE_AD_SUCCESS';
export const UPDATE_AD_FAILURE = 'UPDATE_AD_FAILURE';

export const DELETE_AD_REQUEST = 'DELETE_AD_REQUEST';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => ({
    type: TOGGLE_THEME
});




// Action creators
export const fetchAdsRequest = () => ({
    type: FETCH_ADS_REQUEST
});

export const fetchAdsSuccess = (ads) => ({
    type: FETCH_ADS_SUCCESS,
    payload: ads
});

export const fetchAdsFailure = (error) => ({
    type: FETCH_ADS_FAILURE,
    payload: error
});

export const fetchAds = () => {
    return dispatch => {
        dispatch(fetchAdsRequest());
        return axios.get('http://localhost:3001/ads')
            .then(response => {
                dispatch(fetchAdsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchAdsFailure(error));
                throw error;
            });
    };
};

export const createAdRequest = () => ({
    type: CREATE_AD_REQUEST
});

export const createAdSuccess = (message) => ({
    type: CREATE_AD_SUCCESS,
    payload: message
});

export const createAdFailure = (error) => ({
    type: CREATE_AD_FAILURE,
    payload: error
});

export const createAd = (adData) => {
    return dispatch => {
        dispatch(createAdRequest());
        return axios.post('http://localhost:3001/ads/create', adData)
            .then(response => {
                dispatch(createAdSuccess(response.data.message));
                return { payload: response.data.message };
            })
            .catch(error => {
                dispatch(createAdFailure(error));
                throw { payload: error.response.data.message };
            });
    };
};

export const updateAdRequest = () => ({
    type: UPDATE_AD_REQUEST
});

export const updateAdSuccess = (message) => ({
    type: UPDATE_AD_SUCCESS,
    payload: message // Передаем сообщение в качестве payload
});

export const updateAdFailure = (error) => ({
    type: UPDATE_AD_FAILURE,
    payload: error
});

export const updateAd = (id, adData) => {
    return dispatch => {
        dispatch(updateAdRequest());
        return axios.put(`http://localhost:3001/ads/${id}`, adData)
            .then(response => {
                dispatch(updateAdSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(updateAdFailure(error));
                throw error;
            });
    };
};

export const deleteAdRequest = () => ({
    type: DELETE_AD_REQUEST
});

export const deleteAdSuccess = (message) => ({
    type: DELETE_AD_SUCCESS,
    payload: message
});

export const deleteAdFailure = (error) => ({
    type: DELETE_AD_FAILURE,
    payload: error
});

export const deleteAd = (id) => {
    return dispatch => {
        dispatch(deleteAdRequest());
        return axios.delete(`http://localhost:3001/ads/${id}`)
            .then(response => {
                dispatch(deleteAdSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(deleteAdFailure(error));
                throw error;
            });
    };
};



export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (message) => ({
    type: LOGIN_SUCCESS,
    payload: message
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const loginUser = (username, password) => {
    return dispatch => {
        dispatch(loginRequest());
        return axios.post('http://localhost:3001/login', { username, password })
            .then(response => {
                dispatch(loginSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.message));
            });
    };
};

export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = (message) => ({
    type: REGISTER_SUCCESS,
    payload: message
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});

export const registerUser = (username, password) => {
    return dispatch => {
        dispatch(registerRequest());
        return axios.post('http://localhost:3001/register', { username, password })
            .then(response => {
                dispatch(registerSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(registerFailure(error.response.data.message));
            });
    };
};