import React  from 'react'
import { connect } from 'react-redux'
import { Card, CardContent, Image, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

function Question (props) {
  
  const handlePoll = (e) => {
    e.preventDefault()
    const {id,history} = props
    history.push({
      pathname: `/questions/${id}`,
      state:{id:id}
    })
  }

  const {question,user,id} = props
  const headerQuestion = user.name
  const descriptionQuestion = question.optionOne.text.substring(0,15)
  return (
    <Link to={`/questions/${id}`}>
      <div className='poll-card-container'>
        <Card fluid>
          <Card.Content className='question-poll-con'>
            <Card.Header>{headerQuestion} says:</Card.Header>
          </Card.Content>
          <CardContent style={{height:155}}>
            <Image className='question-poll-img' src={user.avatarURL} circular/>
            <div className='question-poll-info'>
              <Card.Header className='question-poll-headr'>Would you rather ?</Card.Header>
              <Card.Description className='question-poll-description'>{descriptionQuestion}</Card.Description>
              <Button className='question-poll-btn' fluid onClick={handlePoll}>View Poll</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  )
}


function mapStateToProps({questions, users}, {id}) {
  const question = questions[id]
  const user = users[question.author]
  return {
    question,
    user
  }
}

export default withRouter(connect(mapStateToProps)(Question))