import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {requiredField, emailValidator, maxLengthCreator} from '../../../validators/validators'
import {Input} from '../../common/FormControls/FormControls'

const maxLength20 = maxLengthCreator(20)

const LoginForm = (props) => {

  return (
    <React.Fragment>
      {props.error &&
        <div
          style={{padding: 18, fontSize: 20, position: "absolute", top: 40, left: '5%', right: '5%', height: 58}}
          className="alert alert-danger" role="alert">
          {props.error}
        </div>
      }
      <form onSubmit={props.handleSubmit}>
        <Field
          validate={[requiredField, emailValidator]}
          name="email"
          placeholder="Email"
          component={Input} />
        <Field
          validate={[requiredField, maxLength20]}
          type="password"
          name="password"
          placeholder="Password"
          component={Input} />
        {
          props.captchaUrl &&
          <React.Fragment>
            <img style={{marginBottom: 5}} src={props.captchaUrl} alt=""/>
            <Field
              validate={[requiredField]}
              name="captcha"
              placeholder="enter symbol"
              component={Input} />
          </React.Fragment>
        }
        <button className="btn btn-success">Log In</button>
      </form>
    </React.Fragment>

  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
}) (LoginForm)

export default LoginReduxForm