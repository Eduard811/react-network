import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Header from '../Header/Header'
import UsersContainer from '../Users/UsersContainer'
import ProfileContainer from '../Profile/ProfileContainer'
import ScrollToTop from './ScrollToTop'
import DialogsContainer from '../Dialogs/DialogsContainer'


const Main = ({authorizedUserId}) => {
  return (
      <div>
        <Header />
        <div style={{marginTop: 80}} className="container">
          <ScrollToTop />
            <Switch>
              <Redirect exact from="/" to="/profile" />
              <Redirect exact from={`/profile/${authorizedUserId}`} to="/profile" />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
              <Route path="/find-user" render={() => <UsersContainer />} />
              <Route path="/profile/:userId?" render={() => <ProfileContainer /> }/>
            </Switch>
        </div>
      </div>
    )
}

export default Main