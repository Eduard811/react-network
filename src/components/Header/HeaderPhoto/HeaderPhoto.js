import React, {useEffect} from 'react'
import AvatarLoader from '../../common/Loader/AvatarLoader'


const HeaderPhoto = ({profilePhoto, getProfilePhoto, authorizedUserId}) => {

  useEffect(() => {
    getProfilePhoto(authorizedUserId)
  }, [])

  if (!profilePhoto) return <AvatarLoader />

  return (
    <img src={profilePhoto.large} alt="" />
  )
}

export default HeaderPhoto