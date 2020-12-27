import React from 'react'
import classes from './MyPosts.module.scss'
import Post from './Posts/Posts'
import {reset} from 'redux-form'

import {connect} from 'react-redux'
import {addPostAC} from '../../../redux/reducers/profileReducer'
import MyPostReduxForm from './MyPostForm/MyPostForm'

const MyPosts = ({posts, addPost, like, dislike, profilePhoto}) => {

  const onAddPost = (value, dispatch) => {
    addPost(value.newPostText)
    dispatch(reset('myPost'))
  }

  return (
    <React.Fragment>
      <div className={classes.myPost}>
        <div>
          <MyPostReduxForm onSubmit={onAddPost} />
        </div>
      </div>
      <div className={classes.myPost__posts}>
        <Post posts={posts} like={like} dislike={dislike} profilePhoto={profilePhoto}/>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    profilePhoto: state.profilePage.profilePhoto
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostAC(newPostText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)