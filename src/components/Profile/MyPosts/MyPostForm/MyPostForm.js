import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {requiredField} from '../../../../validators/validators'

const MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field validate={requiredField} name="newPostText" component="textarea" className="form-control" placeholder="your news..." />
      <button className="btn btn-success">Send</button>
    </form>
  )
}

const MyPostReduxForm = reduxForm({
  form: 'myPost'
})(MyPostForm)


export default MyPostReduxForm