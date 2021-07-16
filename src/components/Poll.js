import React, { Component } from 'react'
import { Card, Image, Checkbox, Button, Progress,Label,Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions';
import { withRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'

class Poll extends Component {
  state = {
    selectedbox: ''
  }

  handleChange = (e, {value}) => {
    this.setState({selectedbox:value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch,authedUser,id} = this.props
    const {selectedbox} = this.state

    if(selectedbox !== null) {
      dispatch(handleAddAnswer({
        authedUser:authedUser,
        questionId: id,
        answer:selectedbox
      }))
    }
  }

  render() {
    const {question,authorAvatar,errorPag,userName,answer} = this.props
    if(errorPag) {
      return (
        <div>
          <ErrorPage/>
        </div>
      )
    }
    let votedOptionOne=false
    let votedOptionTwo =false
    let optionOneColor = 'red'
    let optionTwoColor = 'red'
    let optionOneVotes = question.optionOne.votes.length
    let optionTwoVotes = question.optionTwo.votes.length
    let totalVotes = optionOneVotes + optionTwoVotes
    let hasQuestionUnAnswered = true
    if(answer!==null){
      hasQuestionUnAnswered = false
      if(answer==='optionOne') {votedOptionOne=true; optionOneColor='teal'}
      if(answer==='optionTwo') {votedOptionTwo=true; optionTwoColor='teal'}
    }
    return(
      <div className='poll-container'>
      { hasQuestionUnAnswered ?
        (
        <div>
          <div className='poll-unanswered-container'>
            <Card fluid>
              <div className='poll-un-header'>
                <Card.Header className='poll-un-header-font' >{userName} Asks:</Card.Header>
              </div>
              <Card.Content className='poll-una-content'>
                <div className='poll-una-img'>
                  <Image className='poll-una-img-in' src = {authorAvatar} circular/>
                </div>
                <div className='poll-una-content-in'>
                  <div>
                    <Card.Header className='poll-un-con-header-font'>Would You Rather ?</Card.Header>
                  </div>
                  <div className='cheackbox-style'>
                    <Checkbox radio name='checkboxOne' 
                    label={question.optionOne.text} 
                    value='optionOne' 
                    checked={this.state.selectedCheckbox === 'optionOne'} 
                    onChange={this.handleChange}/>
                    <Checkbox radio name='checkboxTwo' style={{paddingTop:'15px'}} 
                    label={question.optionTwo.text} 
                    value='optionTwo' 
                    checked={this.state.selectedCheckbox === 'optionTwo'} 
                    onChange={this.handleChange}/>
                  </div>
                  <Button className='poll-una-btn' fluid onClick={this.handleSubmit}>Submit</Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>)

        : (
        <div>
            <div className='poll-answered-container'>
              <Card fluid>
                <div  className='poll-an-header'>
                  <Card.Header className='poll-an-header-font'>Asked by {userName}</Card.Header>
                </div>
                <Card.Content className='poll-an-content'>
                  <div className='poll-an-img'>
                    <Image src = {authorAvatar} circular/>
                  </div>
                  <div className='poll-an-content-in'>
                    <div>
                      <Card.Header className='poll-an-header-font'>Results:</Card.Header>
                    </div>
                    <div>
                      <Message className='message1-style' color={optionOneColor}>
                        <div>
                          { votedOptionOne ?
                            <Label ribbon='right' floating color='red'>Your Vote</Label> : <div></div> }
                            <div>
                              <Message.Header className='message-header'>{question.optionOne.text}</Message.Header>
                              <Progress className='progress-style' 
                              value={optionOneVotes} 
                              total={totalVotes} 
                              progress='percent' precision={1} color='red'/>
                              <Message.Header className='message1-header'>{optionOneVotes} out of {totalVotes} votes</Message.Header>
                            </div>
                        </div>
                      </Message>
                    </div>
                    <div>
                      <Message className='message1-style' color={optionTwoColor}>
                        <div> 
                          {votedOptionTwo ?
                          <Label ribbon='right' floating color='red'>Your Vote</Label> : <div></div> }
                          <div>
                            <Message.Header className='message-header'>{question.optionTwo.text}</Message.Header>
                            <Progress className='progress-style' 
                            value={optionTwoVotes} 
                            total={totalVotes} 
                            progress='percent' color='red' precision={1}/>
                            <Message.Header className='message1-header'>{optionTwoVotes} out of {totalVotes} votes</Message.Header>
                          </div>
                        </div>
                      </Message>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
        </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users},{match}) {
  if(questions[match.params.question_id] === undefined) {
    const errorPag = true;
    return {
      errorPag
    }
  }
  const userName = users[questions[match.params.question_id].author].name
  const id = match.params.question_id
  const question = questions[id]

  let answer=''
  if(question.optionOne.votes.includes(authedUser)) {
    answer = 'optionOne'
  } else if (question.optionTwo.votes.includes(authedUser)) {
    answer = 'optionTwo'
  } else {
    answer = null
  }
  const authorAvatar = users[question.author].avatarURL
  const errorPag = false
  return {
    id,
    question,
    answer,
    authedUser,
    userName,
    authorAvatar,
    errorPag
  }
}

export default withRouter(connect(mapStateToProps)(Poll))