import React from 'react'
import { Tab } from 'semantic-ui-react'
import Question from './Question'
import { connect } from 'react-redux';

function Home (props) {

  const {unAnsweredQuestions, answeredQuestions} = props

  const panes = [
    {
      menuItem: 'Unanswered Questions',
      render: () =>
      <Tab.Pane attached='bottom'>
        { unAnsweredQuestions.map((id) => (
          <li key={id} >
            <Question id={id}/>
          </li>
        ))}
      </Tab.Pane>
    },
    {
      menuItem: 'Answered Questions',
      render: () =>
      <Tab.Pane attached='bottom'>
        { answeredQuestions.map((id) => (
          <li key={id} >
            <Question id={id}/>
          </li>
        ))}
      </Tab.Pane>
    }
  ]

  return(
    <div className='tap-container'>
      <Tab className='tap-style' panes={panes}/>
    </div>
  )
}

function mapStateToProps({authedUser,questions}) {
  const unAnsweredQuestions = Object.keys(questions)
    .filter((k) => (
      !questions[k].optionOne.votes.includes(authedUser) &&
      !questions[k].optionTwo.votes.includes(authedUser)
    ))
    .sort((a,b) => (
      questions[b].timestamp - questions[a].timestamp
    ))
    const answeredQuestions = Object.keys(questions)
    .filter((k) => (
      questions[k].optionOne.votes.includes(authedUser) ||
      questions[k].optionTwo.votes.includes(authedUser)
    ))
    .sort((a,b) => (
      questions[b].timestamp - questions[a].timestamp
    ))
  return {
    unAnsweredQuestions,
    answeredQuestions
  }
}
export default connect (mapStateToProps)(Home)