import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions
    }
  }

  function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    }
  }

  function addAnswer({authedUser, questionId, answer}) {
    return {
      type: ADD_ANSWER,
      authedUser,
      questionId,
      answer
    }
  }

  export function handleAddQuestion({optionOneText, optionTwoText,authedUser}) {
    return (dispatch) => {
      dispatch(showLoading())
      return _saveQuestion({
        optionOneText,
        optionTwoText,
        author:authedUser
      }).then((question) =>
        dispatch(addQuestion(question))
        ).then(() =>dispatch(hideLoading()))
    }
  }

  export function handleAddAnswer({authedUser, questionId, answer}) {
    return (dispatch) => {
      dispatch(showLoading())
      dispatch(addAnswer({authedUser:authedUser, questionId:questionId,answer:answer}))
      return _saveQuestionAnswer({authedUser:authedUser, qid:questionId,answer:answer})
      .then(() => dispatch(hideLoading()))
    }
  }