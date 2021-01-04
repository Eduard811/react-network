import {usersAPI} from '../../api/api'
import {PhotosType} from './profileReducer'
import {BaseThunkType, InferActionTypes} from '../store'

export type UserType = {
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
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users]
      }
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false}
          }
          return user
        })
      }
    case 'SET_CURRENT_PAGE':
      return  {
        ...state,
        currentPage: action.currentPage
      }
      case 'SET_TOTAL_USERS_COUNT':
      return  {
        ...state,
        totalUsersCount: action.totalCount
      }
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.search
      }
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching
      }
      case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number)=> ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setUsersTotalCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
  setSearch: (search: string) => ({type: 'SET_SEARCH', search} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
      ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

export const getUsers = (currentPage: number, pageSize: number, search: string): ThunkType =>
    async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setSearch(search))

    const data = await usersAPI.getUsers(currentPage, pageSize ,search)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  const response = await usersAPI.follow(userId)

   if (response.data.resultCode === 0) {
     dispatch(actions.followSuccess(userId))
   }

   dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  const response = await usersAPI.unFollow(userId)

   if (response.data.resultCode === 0) {
     dispatch(actions.unfollowSuccess(userId))
   }

   dispatch(actions.toggleFollowingProgress(false, userId))

}

export default usersReducer