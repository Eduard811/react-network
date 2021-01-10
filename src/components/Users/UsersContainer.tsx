import React from 'react'
import {connect} from 'react-redux'
import {
  follow,
  unfollow,
  getUsers,
  setQueryString
} from '../../redux/reducers/usersReducer'
import Users from './Users'
import {UserType} from '../../redux/reducers/usersReducer'
import {RootState} from '../../redux/reducers/rootReducers'

type MapStateToProps = {
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  users: Array<UserType>
  search: string
}

type MapDispatchToProps = {
  getUsers: (currentPage: number, pageSize: number, search: string) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  setQueryString: (querystring: string) => void
}

type Props = MapStateToProps & MapDispatchToProps


const UsersContainer: React.FC<Props> = ({getUsers, currentPage, pageSize,
                                           isFetching, totalUsersCount,users,
                                           unfollow, follow, followingInProgress, search,setQueryString}) => {

  return (
    <Users
          isFetching={isFetching }
          totalUsersCount={totalUsersCount}
          currentPage={currentPage}
          pageSize={pageSize}
          users={users}
          unfollow={unfollow}
          follow={follow}
          followingInProgress={followingInProgress}
          getUsers={getUsers}
          search={search}
          setQueryString={setQueryString}
        />
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
    search: state.usersPage.search
  }
}

export default connect<MapStateToProps, MapDispatchToProps, any, RootState>(mapStateToProps, {
  follow,
  unfollow,
  getUsers,
  setQueryString
})(UsersContainer)