import {profileAPI} from '../../api/api'
import {actions as usersActions} from './usersReducer'
import {BaseThunkType, InferActionTypes} from '../store'

type PostsType = {
  id: number,
  post: string,
  like: number,
  isLike: boolean
}

export type ProfileType = {
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
  profilePhoto: null as PhotosType | null,
  isOpen: false,
}

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions | typeof usersActions>
type ThunkType = BaseThunkType<ActionsType>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_NEW_POST':
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
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      }
    case 'SET_STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'SET_PHOTO':
      return {
        ...state,
        profilePhoto: action.photos
      }
    case 'SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType,
        profilePhoto: action.photos
      }
    case 'TOGGLE_FORM_VISIBLE':
      return {
        ...state,
        isOpen: action.isOpen
      }
    case 'LIKE':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) {
            return {...post, like: post.like + 1, isLike: true}
          }
          return post
        })
      }
    case 'DISLIKE':
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

export const actions = {
  addPostAC: (newPostText: string) => ({type: 'ADD_NEW_POST', newPostText} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
  setPhoto: (photos: PhotosType) => ({type: 'SET_PHOTO', photos} as const),
  toggleFormVisible: (isOpen: boolean) => ({type: 'TOGGLE_FORM_VISIBLE', isOpen} as const),
  likePost: (postId: number) => ({type: 'LIKE', postId} as const),
  dislikePost: (postId: number) => ({type: 'DISLIKE', postId} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFetching(true))
  const response = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(response.data))
  dispatch(usersActions.toggleIsFetching(false))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(response.data))
}

export const getProfilePhoto = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
  dispatch(actions.setPhoto(response.data.photos))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)

  if (response.data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)

  if (response.data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.data.photos))
  }

}

export const saveProfileInfo = (profile: ProfileType): ThunkType => async (dispatch, getState) => {

  const userId = getState().auth.id
  const response = await profileAPI.saveProfileInfo(profile)

  if (response.data.resultCode === 0) {
    if (userId != null) {
      await dispatch(getUserProfile(userId))
    } else {
      throw new Error("userId can't be null")
    }
  }

}

export const setFormVisible = (isOpen: boolean) => actions.toggleFormVisible(isOpen)
export const like = (postId: number) => actions.likePost(postId)
export const dislike = (postId: number) => actions.dislikePost(postId)

export default profileReducer