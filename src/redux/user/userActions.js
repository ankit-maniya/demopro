import { FETCH_USER_FAILER, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './userTypes'

const fetchUserRequest = () => {
    return {
        type:FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (user) => {
    return {
        type:FETCH_USER_SUCCESS,
        payload:user
    }
}

const fetchUserFailer = (error) => {
    return {
        type:FETCH_USER_FAILER,
        payload:error
    }
}

export {fetchUserRequest,fetchUserSuccess,fetchUserFailer}