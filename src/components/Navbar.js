import React from 'react'
import loginImg from '../images/loginPageImgs/login.png'
import { Menu, Image} from 'semantic-ui-react'
import { NavLink,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {logOut} from '../actions/authedUser'

function Navbar (props) {

  const handleLogout = (e, { name }) =>{
    const {history} = props
    e.preventDefault()
    if(name==='logOut'){
      props.dispatch(logOut())
      history.push('/login')
    }
  }

  const {authedUser,users} = props
  const user = users[authedUser]

  return(
  <div>
    <div className='nav-items'>
      <Menu className='nav-menu'>
        <Menu.Item >
          <span className='nav-logo'>Would You Rather ?</span>
        </Menu.Item>
        <Menu.Item className='le' as={NavLink} name='home' exact to='/'>
          <span className='iv'>Home</span> 
        </Menu.Item>
        <Menu.Item className='le' as={NavLink} name='newQuestion' exact to='/add'>
          <span className='iv'>New Question</span> 
        </Menu.Item>
        <Menu.Item className='le' as={NavLink} name='leaderBoard' exact to='/leaderboard'>
          <span className='iv'>Leader Board</span>
        </Menu.Item>
        {authedUser ?
        <Menu.Menu position='right'>
            <Menu.Item name='username' >
              <span className='login-name'>Welcom Back : {user.name}</span> 
            </Menu.Item>
            <Image className='avatar-img' avatar src={user!== 'undefined' ? user.avatarURL : {loginImg}}/>
            <Menu.Item className='logout-btn' as={NavLink} name='logOut' exact to='/login' onClick={handleLogout}>
              <span className='logout-btn-s'>Log out</span> 
            </Menu.Item>
        </Menu.Menu>: <div></div>}
      </Menu>
    </div>
  </div>
  )
}

function mapStateToProps ({authedUser,users}) {
  return {
    authedUser,
    users
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))