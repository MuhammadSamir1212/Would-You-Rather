import { RECEIVE_USERS, ADD_QUESTION, ADD_ANSWER } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
            case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                   ...state[action.question.author],
                   questions: state[action.question.author].questions.concat([action.question.id])
               }
            }
            case ADD_ANSWER:
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.questionId]:action.answer
                    }
                }
            }
        default:
            return state;
    }
}