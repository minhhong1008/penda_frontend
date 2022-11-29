export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_RPOFILE_FAIL = 'GET_RPOFILE_FAIL';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export const GET_LIST_USER_REQUEST = 'GET_LIST_USER_REQUEST';
export const GET_LIST_USER_SUCCESS = 'GET_LIST_USER_SUCCESS';
export const GET_LIST_USER_FAIL = 'GET_LIST_USER_FAIL';


export const getProfileAction = (payload) => {
    return {
        type: GET_PROFILE_REQUEST,
        payload: payload
    }
}

export const updateProfileAction = (payload) => {
    return {
        type: UPDATE_PROFILE_REQUEST,
        payload: payload,
    }
}

export const getListUserAction = (payload) => {
    return {
        type: GET_LIST_USER_REQUEST,
        payload: payload
    }
}
