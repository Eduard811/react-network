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

type PostsType = {
  id: number,
  post: string,
  like: number,
  isLike: boolean
}

type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string
}

export type PhotosType = {
  small: string | null,
  large: string | null
}

const initialState = {
  posts: [
    {id: 1, post: 'Hi, my name is Eduard!', like: 125, isLike: false},
    {id: 2, post: 'I program in JavaScript', like: 126, isLike: true},
    {id: 3, post: 'I am looking for a job', like: 115, isLike: false}
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: '',
  profilePhoto: null,
  isOpen: false,
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_NEW_POST:
      let newPost = {
        id: Math.random(),
        post: action.newPostText,
        like: 0,
        isLike: false
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
        profile: {...state.profile, photos: action.photos} as ProfileType,
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

type addPostActionType = {
  type: typeof ADD_NEW_POST,
  newPostText: string
}

export const addPostAC = (newPostText: string): addPostActionType => ({type: ADD_NEW_POST, newPostText})

type setUserProfileType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): setUserProfileType => ({type: SET_USER_PROFILE, profile})

type setStatusType = {
  type: typeof SET_STATUS,
  status: string
}

export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status})

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

type setPhotoType = {
  type: typeof SET_PHOTO,
  photos: PhotosType
}

export const setPhoto = (photos: PhotosType): setPhotoType => ({type: SET_PHOTO, photos})

type toggleFormVisibleAction = {
  type: typeof TOGGLE_FORM_VISIBLE,
  isOpen: boolean
}

export const toggleFormVisible = (isOpen: boolean): toggleFormVisibleAction => ({type: TOGGLE_FORM_VISIBLE, isOpen})

type likePostType = {
  type: typeof LIKE,
  postId: number
}
export const likePost = (postId: number): likePostType => ({type: LIKE, postId})

type dislikePostType = {
  type: typeof DISLIKE,
  postId: number
}

export const dislikePost = (postId: number): dislikePostType => ({type: DISLIKE, postId})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true))
  const response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
  dispatch(toggleIsFetching(false))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const getProfilePhoto = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(setPhoto(response.data.photos))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status)

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }

}

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file)

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }

}

export const saveProfileInfo = (profile: ProfileType) => async (dispatch: any, getState: any) => {

  const userId = getState().auth.id
  const response = await profileAPI.saveProfileInfo(profile)

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  }

}

export const setFormVisible = (isOpen: boolean) => (dispatch: any) => {
  dispatch(toggleFormVisible(isOpen))
}

export const like = (postId: number) => (dispatch: any) => {
  dispatch(likePost(postId))
}

export const dislike = (postId: number) => (dispatch: any) => {
  dispatch(dislikePost(postId))
}


export default profileReducer