import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/reducers/dialogsReducer'
import Dialogs from './Dialogs'
import {Route, Switch} from 'react-router-dom'
import Messages from './Messages/Messages'

const DialogContainer = ({messages, users, sendMessage, profilePhoto}) => {
  return (
    <Switch>
      <Route exact path="/dialogs" render={ () => <Dialogs users={users} /> } />
      <Route path="/dialogs/1"
             render={ () => <Messages profilePhoto={profilePhoto}
                                     sendMessage={sendMessage}
                                     messages={messages}/> } />
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.dialogs.users,
    messages: state.dialogs.messages,
    profilePhoto: state.profilePage.profilePhoto
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageAC(newMessageBody))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DialogContainer)