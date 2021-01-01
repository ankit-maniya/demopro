import userReducer from './user/userReducers'
import { createStore, combineReducers } from 'redux'
import { connect } from 'react-redux'


const rootReducer = combineReducers({
    user: userReducer
})

const store = createStore(rootReducer)

export default store