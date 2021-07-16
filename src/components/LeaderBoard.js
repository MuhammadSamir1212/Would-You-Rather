import React from 'react'
import { connect } from 'react-redux'
import AvatarCard from './AvatarCard'

function LeaderBoard (props) {
  
  const {usersDetails} = props
  return(
    <div className='leaderboard-container'>
      { usersDetails.map((user) => (
        <li key={user.name} >
          <AvatarCard user={user}/>
        </li>
      ))}
    </div>
  )
}

function mapStateToProps({users}) {
  const usersDetails = Object.keys(users)
    .map((user) => {
      const userCardDetails = {
        name: users[user].name,
        avatarURL: users[user].avatarURL,
        questionsAnswered: Object.keys(users[user].answers).length,
        createdQuestions: users[user].questions.length
      }
      const rank = userCardDetails.questionsAnswered + userCardDetails.createdQuestions
      userCardDetails.rank = rank;
      return(userCardDetails)
    })
    .sort((a,b) => (b.rank - a.rank))
  return {
    usersDetails
  }
}

export default connect (mapStateToProps)(LeaderBoard)