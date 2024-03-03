// reducers.js

import {
    FETCH_ADS_REQUEST,
    FETCH_ADS_SUCCESS,
    FETCH_ADS_FAILURE,
    CREATE_AD_REQUEST,
    CREATE_AD_SUCCESS,
    CREATE_AD_FAILURE,
    UPDATE_AD_REQUEST,
    UPDATE_AD_SUCCESS,
    UPDATE_AD_FAILURE,
    DELETE_AD_REQUEST,
    DELETE_AD_SUCCESS,
    DELETE_AD_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE, TOGGLE_THEME
} from './actions';

const initialState = {
    ads: [],
    loading: false,
    error: null,
    auth: {
        message: ''
    },
    darkTheme: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADS_REQUEST:
        case CREATE_AD_REQUEST:
        case UPDATE_AD_REQUEST:
        case DELETE_AD_REQUEST:
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ADS_SUCCESS:
            return {
                ...state,
                ads: action.payload,
                loading: false,
                error: null
            };
        case CREATE_AD_SUCCESS:
        case UPDATE_AD_SUCCESS:
        case DELETE_AD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case FETCH_ADS_FAILURE:
        case CREATE_AD_FAILURE:
        case UPDATE_AD_FAILURE:
        case DELETE_AD_FAILURE:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                auth: {
                    message: action.payload
                }
            };
        case TOGGLE_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        default:
            return state;
    }
};

export default rootReducer;
