import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'


export default combineReducers({
  app: appReducer,
  usersPage: usersReducer,
  dialogs: dialogsReducer,
  profilePage: profileReducer,
  auth: authReducer,
  form: formReducer
})
