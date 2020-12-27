import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {Input} from '../../common/FormControls/FormControls'

const Search = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <button className="btn btn-primary">search</button>
      <Field  name="search" placeholder="enter the user name" component={Input}/>
    </form>
  )
}

const SearchReduxForm = reduxForm({
  form: 'searchForm'
}) (Search)

export default SearchReduxForm