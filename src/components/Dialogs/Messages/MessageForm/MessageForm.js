import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {requiredField} from '../../../../validators/validators'

const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field validate={[requiredField]} name="newMessageBody" component="textarea"  className="form-control" placeholder="Enter your message..." />
      <button className="btn btn-success">Send</button>
    </form>
  )
}

const MessageReduxForm = reduxForm({
  form: 'dialogs'
}) (MessageForm)

export default MessageReduxForm