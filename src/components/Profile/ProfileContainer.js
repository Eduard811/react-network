import React, {useEffect} from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {
  getUserProfile,
  getUserStatus,
  updateStatus,
  savePhoto,
  saveProfileInfo,
  setFormVisible,
  like,
  dislike
} from '../../redux/reducers/profileReducer'
import {withRouter} from 'react-router-dom'


const ProfileContainer = (props) => {
  useEffect(() => {
    let userId = props.match.params.userId

    if (!userId) {
      userId = props.authorizedUserId
    }

    props.getUserProfile(userId)
    props.getUserStatus(userId)
  }, [props.match.params.userId])

  return (
    <Profile
      isOwner={!props.match.params.userId}
      {...props}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      saveProfileInfo={props.saveProfileInfo}
      isFetching={props.isFetching}
      isOpen={props.isOpen}
      setFormVisible={props.setFormVisible}
      like={props.like}
      dislike={props.dislike}
    />
  )
}

const mapSateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isFetching: state.usersPage.isFetching,
  isOpen: state.profilePage.isOpen
})

let WithRouterData = withRouter(ProfileContainer)

export default connect(mapSateToProps, {
  getUserProfile,
  getUserStatus,
  savePhoto,
  saveProfileInfo,
  updateStatus,
  setFormVisible,
  like,
  dislike
})(WithRouterData)