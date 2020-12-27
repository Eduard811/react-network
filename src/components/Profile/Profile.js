import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {

  return (
    <React.Fragment>
        <ProfileInfo
          isFetching={props.isFetching}
          isOwner={props.isOwner}
          profile={props.profile}
          status={props.status}
          updateStatus={props.updateStatus}
          savePhoto={props.savePhoto}
          saveProfileInfo={props.saveProfileInfo}
          isOpen={props.isOpen}
          setFormVisible={props.setFormVisible}
        />
      {
        props.isOwner &&
        <MyPosts
          like={props.like}
          dislike={props.dislike}/>
      }
    </React.Fragment>
  )
}

export default Profile