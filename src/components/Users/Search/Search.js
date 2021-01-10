import React, {useEffect} from 'react'
import {reduxForm, Field, initialize} from 'redux-form'
import {Input} from '../../common/FormControls/FormControls'
import {connect} from 'react-redux'


const Search = (props) => {

  useEffect(() => {
    props.dispatch(initialize('searchForm', {search: props.search}))
  }, [props.search])

  return (
    <form onSubmit={props.handleSubmit}>
      <button className="btn btn-primary">search</button>
      <Field name="search" placeholder="enter the user name" component={Input} />
    </form>
  )
}

const SearchReduxForm = reduxForm({
  form: 'searchForm',
  enableReinitialize : true,
  keepDirtyOnReinitialize: true
}) (Search)

const mapStateToProps = (state) => {
  return {
    search: state.usersPage.search
  }
}

export default connect(mapStateToProps, {initialize})(SearchReduxForm)