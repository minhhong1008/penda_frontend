// contants

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

// actions

export const loginAction = ( payload ) => {
    return {
        type: LOGIN_REQUEST,
        payload: payload,
    }
}

export const registerAction = ( payload ) => {
    return {
        type: REGISTER_REQUEST,
        payload: payload,
    }
}

export const logoutAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}