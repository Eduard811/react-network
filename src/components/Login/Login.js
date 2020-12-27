import React from 'react'
import classes from './Login.module.scss'
import LoginReduxForm from './LoginForm/LoginForm'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/authReducer'
import {reset} from 'redux-form'

const Login = (props) => {

  const onSubmit = (formData, dispatch) => {
    props.login(formData.email, formData.password, true, formData.captcha)
    dispatch(reset('login'))
  }

  return (
    <div className="container">
      <div className={classes.login}>
        <div className={classes.login__wrapper}>
          <div className={classes.login__description}>
            <h1>React-Network</h1>
            <h2>React-Network helps you connect<br/> and share with the people in you life.</h2>
          </div>
          <div className={classes.login__form}>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)