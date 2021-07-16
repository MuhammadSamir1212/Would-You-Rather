export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function addAnswer({authedUser, questionId, answer}) {
  return {
    type: ADD_ANSWER,
    authedUser,
    questionId,
    answer
  }
}