import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Card, Input, Divider, Button } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText:'',
    optionTwoText:''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch, authedUser,history} = this.props
    const {optionOneText,optionTwoText} = this.state

    if(optionOneText&&optionTwoText) {
      dispatch(handleAddQuestion({optionOneText,optionTwoText,authedUser}))
    }
    history.push('/')
  }

  handleOneChange = (e, data) => {
    e.preventDefault()
    this.setState({
      optionOneText:data.value
    })
  }

  handleTwoChange = (e, data) => {
    e.preventDefault()
    this.setState({
      optionTwoText:data.value
    })
  }

  render() {
    return(
      <div className='add-question-container'>
        <Card fluid>
          <Card.Header className='add-question-header' >Create New Question</Card.Header>
          <Card.Content className='add-question-content'>
            <Card.Header className='add-question-header' >Would you rather ?</Card.Header>
            <Input fluid placeholder='Option One' onChange={this.handleOneChange}></Input>
            <Divider horizontal>OR</Divider>
            <Input fluid placeholder='Option Two' onChange={this.handleTwoChange}></Input>
            <Button fluid className='add-question-btn' onClick={this.handleSubmit}>Submit</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)