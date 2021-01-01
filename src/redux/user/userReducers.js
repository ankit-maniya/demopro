import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILER } from "./userTypes";

const initState = {
    loading: false,
    user: [],
    error: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            }

        case FETCH_USER_FAILER:
            return {
                loading: false,
                user: [],
                error: action.payload
            }

        default:
            return state
    }

}

export default userReducer