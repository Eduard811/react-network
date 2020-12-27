import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {initializeApp} from './redux/reducers/appReducer'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import InitializedLoader from './components/common/Loader/InitializedLoader'

function App(props) {

  useEffect(() => {
    props.initializeApp()
  }, [])

  return (
    props.initialized
      ? props.isAuth ? <Main authorizedUserId={props.authorizedUserId} /> : <Login />
      : <InitializedLoader />
  )
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
  authorizedUserId: state.auth.id
})

export default connect(mapStateToProps, {initializeApp})(App)
