import React from 'react'
import classes from './ProfileForm.module.scss'
import {reduxForm, Field} from 'redux-form'
import {Input} from '../../common/FormControls/FormControls'
import {maxLengthCreator, requiredField} from '../../../validators/validators'

const maxLength20 = maxLengthCreator(20)
const maxLength50 = maxLengthCreator(50)
const maxLength30 = maxLengthCreator(30)

const ProfileForm = (props) => {

  const closeForm = () => props.setFormVisible(false)

  return (
    <div className={classes.profileForm}>
      <div className={classes.profileForm__close}>
        <button onClick={closeForm} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={props.handleSubmit}>
        <Field
          validate={[requiredField, maxLength20]}
          name="fullName"
          type="text"
          className="form-control"
          placeholder="Name"
          component={Input}
        />
        <Field
          validate={[requiredField, maxLength30]}
          name="aboutMe"
          type="text"
          className="form-control"
          placeholder="About me"
          component={Input}/>
        <Field
          validate={[requiredField, maxLength50]}
          name="lookingForAJobDescription"
          type="text"
          className="form-control"
          placeholder="My professional skills"
          component={Input}/>
        <div>
          <Field name="lookingForAJob" id="checkbox1" type="checkbox" component="input"/>
            <label htmlFor="checkbox1">Looking for a job</label>
        </div>
        <button className="btn btn-success">Send</button>
      </form>
    </div>
  )
}

const ProfileReduxForm = reduxForm({
  form: 'profileInfo'
}) (ProfileForm)


export default ProfileReduxForm