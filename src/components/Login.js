import React, { Component } from 'react'
import loginImg from '../images/loginPageImgs/login.png'
import { Card, Image, Dropdown, Button } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    userId:  null
  }
  static defaultProps = {
    authUser: null,
    location: null,
  }

  handleSelection = (e, data) => {
    e.preventDefault()
     const id = data.value
    this.setState(() => ({
      userId: id
    }))
  }
  handleLogin = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    if(this.state.userId !== null) {
      dispatch(setAuthedUser(this.state.userId))
    }
  }

  render() {
    const { authedUser,location } = this.props
    const { from } = location.state || { from: { pathname: '/' }}
    if(authedUser !== null) {
      return (
        <Redirect to={from} />
      )
    }
    return(
      <div className='login-back-ground'>
        <div className='login-container'>
          <div className='login'>
            <Image src ={ loginImg } className='login-img' />
            <Card className='login-card'>
              <div>
                <p className='login-p'>Sign In</p>
              </div>
              <div>
                <Dropdown className='login-dropdown' placeholder='Select User'
                  selection 
                  options={this.props.userDetails} 
                  onChange={this.handleSelection} />
              </div>
              <div>
                <Button className='login-btn' onClick={this.handleLogin}>Logn In</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  const userDetails = Object.keys(users)
    .map((user) => {
      const userClearedDetails = {
        text: users[user].name,
        value: users[user].id,
        image: {
          avatar: true,
          src: users[user].avatarURL
        }
      }
        return(userClearedDetails)
    })
  return {
    userDetails,
    authedUser
  }
}

export default connect(mapStateToProps)(Login)