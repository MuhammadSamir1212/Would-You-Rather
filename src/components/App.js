import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import Navbar from './Navbar'
import Login from './Login'
import Home from './Home'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Poll from './Poll'
import ErrorPage from './ErrorPage'
import PvtRoute from './PvtRoute'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    const { dispatch, loading } = this.props
    if(loading === true) {
      dispatch(handleInitialData())
   }
  }
  render() {
    return (
    <Router>
      <Fragment>
        <PvtRoute path={['/', '/add', '/questions/:question_id', '/leaderboard']} exact component={Navbar} />
          <div>
            <LoadingBar/>
            { this.props.loading === true
              ? null
              : 
              <div>
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <PvtRoute path='/' exact component={Home} />
                  <PvtRoute path='/add' exact component={NewQuestion} />
                  <PvtRoute path='/questions/:question_id' exact component={Poll} />
                  <PvtRoute path='/leaderboard' exact component={LeaderBoard} />
                  <Route component={ErrorPage}/>
                </Switch>
              </div>
            }
          </div>
      </Fragment>
    </Router>
    )
  }
}

function mapStateToProps({users}) {
  return {
    loading: Empty(users)
  }
}

function Empty(obj) {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
    return false
  }
  return true
}

export default connect(mapStateToProps)(App)
