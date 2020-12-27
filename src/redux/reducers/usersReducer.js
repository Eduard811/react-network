import {usersAPI} from '../../api/api'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_SEARCH = 'SET_SEARCH'

const initialState = {
  users: [],
  pageSize: 16,
  totalUsersCount: 0,
  currentPage: 0,
  isFetching: false,
  followingInProgress: [],
  search: ''
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setUsersTotalCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setSearch = (search) => ({type: SET_SEARCH, search})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const getUsers = (currentPage, pageSize, search) => async (dispatch) => {

    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    dispatch(setSearch(search))

    const data = await usersAPI.getUsers(currentPage, pageSize ,search)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))

}

export const follow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId))
  const response = await usersAPI.follow(userId)

   if (response.data.resultCode === 0) {
     dispatch(followSuccess(userId))
   }

   dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId))
  const response = await usersAPI.unFollow(userId)

   if (response.data.resultCode === 0) {
     dispatch(unfollowSuccess(userId))
   }

   dispatch(toggleFollowingProgress(false, userId))

}

export default usersReducer