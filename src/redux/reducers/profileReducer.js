import {profileAPI} from "../../api/api";
import {toggleIsFetching} from './usersReducer'

const ADD_NEW_POST = 'ADD_NEW_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const SET_PHOTO = 'SET_PHOTO'
const TOGGLE_FORM_VISIBLE = 'TOGGLE_FORM_VISIBLE'
const LIKE = 'LIKE'
const DISLIKE = 'DISLIKE'

const initialState = {
  posts: [
    {id: 1, post: 'Hi, my name is Eduard!', like: 125, isLike: false},
    {id: 2, post: 'I program in JavaScript', like: 126, isLike: true},
    {id: 3, post: 'I am looking for a job', like: 115, isLike: false}
  ],
  profile: null,
  status: '',
  profilePhoto: null,
  isOpen: false,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POST:
      let newPost = {
        id: Math.random(),
        post: action.newPostText,
        like: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SET_PHOTO:
      return {
        ...state,
        profilePhoto: action.photos
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos},
        profilePhoto: action.photos
      }
    case TOGGLE_FORM_VISIBLE:
      return {
        ...state,
        isOpen: action.isOpen
      }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) {
            return {...post, like: post.like + 1, isLike: true}
          }
          return post
        })
      }
    case DISLIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) {
            return {...post, like: post.like - 1, isLike: false}
          }
          return post
        })
      }
    default:
      return state
  }
}

export const addPostAC = (newPostText) => ({type: ADD_NEW_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setPhoto = (photos) => ({type: SET_PHOTO, photos})
export const toggleFormVisible = (isOpen) => ({type: TOGGLE_FORM_VISIBLE, isOpen})
export const likePost = (postId) => ({type: LIKE, postId})
export const dislikePost = (postId) => ({type: DISLIKE, postId})

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  const response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
  dispatch(toggleIsFetching(false))
}

export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const getProfilePhoto = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(setPhoto(response.data.photos))
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }

}

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }

}

export const saveProfileInfo = (profile) => async (dispatch, getState) => {

  const userId = getState().auth.id
  const response = await profileAPI.saveProfileInfo(profile)

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  }

}

export const setFormVisible = (isOpen) => (dispatch) => {
  dispatch(toggleFormVisible(isOpen))
}

export const like = (postId) => (dispatch) => {
  dispatch(likePost(postId))
}

export const dislike = (postId) => (dispatch) => {
  dispatch(dislikePost(postId))
}


export default profileReducer