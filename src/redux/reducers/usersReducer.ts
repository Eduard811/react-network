import {usersAPI} from '../../api/api'
import {PhotosType} from './profileReducer'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_SEARCH = 'SET_SEARCH'

type UserType = {
  id: number,
  name: string,
  status: string
  photos: PhotosType
}

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 16,
  totalUsersCount: 0,
  currentPage: 0,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of user id
  search: ''
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.users]
      }
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false}
          }
          return user
        })
      }
    case SET_CURRENT_PAGE:
      return  {
        ...state,
        currentPage: action.currentPage
      }
      case SET_TOTAL_USERS_COUNT:
      return  {
        ...state,
        totalUsersCount: action.totalCount
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
      case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state
  }
}

type followSuccessType = {
  type: typeof FOLLOW,
  userId: number
}
export const followSuccess = (userId: number): followSuccessType => ({type: FOLLOW, userId})

type unfollowSuccessType = {
  type: typeof UNFOLLOW,
  userId: number
}

export const unfollowSuccess = (userId: number): unfollowSuccessType => ({type: UNFOLLOW, userId})

type setUsersType = {
  type: typeof SET_USERS,
  users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): setUsersType => ({type: SET_USERS, users})

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})

type setUsersTotalCountType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  totalCount: number
}

export const setUsersTotalCount = (totalCount: number): setUsersTotalCountType => ({type: SET_TOTAL_USERS_COUNT, totalCount})

type setSearchType = {
  type: typeof SET_SEARCH,
  search: string
}

export const setSearch = (search: string): setSearchType => ({type: SET_SEARCH, search})

type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})

type toggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean
  userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const getUsers = (currentPage: number, pageSize: number, search: string) => async (dispatch: any) => {

    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    dispatch(setSearch(search))

    const data = await usersAPI.getUsers(currentPage, pageSize ,search)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))

}

export const follow = (userId: number) => async (dispatch: any) => {
  dispatch(toggleFollowingProgress(true, userId))
  const response = await usersAPI.follow(userId)

   if (response.data.resultCode === 0) {
     dispatch(followSuccess(userId))
   }

   dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  dispatch(toggleFollowingProgress(true, userId))
  const response = await usersAPI.unFollow(userId)

   if (response.data.resultCode === 0) {
     dispatch(unfollowSuccess(userId))
   }

   dispatch(toggleFollowingProgress(false, userId))

}

export default usersReducer