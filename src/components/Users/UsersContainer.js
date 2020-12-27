import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers
} from '../../redux/reducers/usersReducer'
import Users from './Users'

const UsersContainer = (props) => {

  useEffect(() => {
    props.getUsers(props.currentPage, props.pageSize)
  }, [])

  return (
    <Users
          isFetching={props.isFetching }
          totalUsersCount={props.totalUsersCount}
          currentPage={props.currentPage}
          pageSize={props.pageSize}
          users={props.users}
          unfollow={props.unfollow}
          follow={props.follow}
          toggleFollowingProgress={props.toggleFollowingProgress}
          followingInProgress={props.followingInProgress}
          getUsers={props.getUsers}
          search={props.search}
        />
  )
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers
})(UsersContainer)