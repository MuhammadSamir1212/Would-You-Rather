import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import questions from './questions'
import users from './users'
import authedUser from './authedUser'

export default combineReducers({
    questions,
    users,
    authedUser,
    loadingBar: loadingBarReducer
})