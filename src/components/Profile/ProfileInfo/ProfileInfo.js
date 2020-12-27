import React, {useState} from 'react'
import classes from './ProfileInfo.module.scss'
import avatarImg from '../../../assets/img/avatar.png'
import ProfileStatus from '../ProfileStatus/ProfileStatus'
import ProfileReduxForm from '../ProfileForm/ProfileForm'
import Loader from '../../common/Loader/Loader'
import DropDown from './DropDown/DropDown'

const ProfileInfo = ({isOpen, setFormVisible, profile, status, updateStatus,
                       isOwner, savePhoto, saveProfileInfo, isFetching}) => {

  const [dropDown, setDropDown] = useState(false)

  const toggleDropDown = () => setDropDown(!dropDown)

  if (!profile) return <Loader />

  const onAvatarSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfileInfo(formData)
    setFormVisible(false)
  }

  return (
    isFetching
      ? <Loader />
      : <div className={classes.profile}>
        <div className={dropDown ? `${classes.moreDetailedMobile} ${classes.active}` : classes.moreDetailedMobile}>
          <ul>
            <li>About Me:&nbsp;<p>{profile.aboutMe}</p></li>
            <li>Looking for a job:&nbsp;<p>{profile.lookingForAJob ? "yes" : "no"}</p></li>
            {
              profile.lookingForAJob
                ? <li>My professional skills:&nbsp;<p>{profile.lookingForAJobDescription}</p></li>
                : null
            }
          </ul>
        </div>
      <div className={classes.profile__avatar}>
        <img src={profile.photos.large || avatarImg} alt="" />
        {
          isOwner &&
              <div className={classes.uploadPhoto}>
                <input type="file" onChange={onAvatarSelected} />
              </div>
        }
      </div>
      <div className={classes.profile__description}>
        <div className={classes.profile__description__status}>
          <h1>{profile.fullName}</h1>
          {
            isOwner
            ? <ProfileStatus status={status} updateStatus={updateStatus} />
            : <span style={{marginLeft: 2}}>{status}</span>
          }
        </div>
        <ul className={classes.moreDetailedDesktop}>
          <li>About Me:&nbsp;<p>{profile.aboutMe}</p></li>
          <li>Looking for a job:&nbsp;<p>{profile.lookingForAJob ? "yes" : "no"}</p></li>
          {
            profile.lookingForAJob
              ? <li>My professional skills:&nbsp;<p>{profile.lookingForAJobDescription}</p></li>
              : null
          }
        </ul>
        <div className={classes.online}>
          <p>Online</p>
        </div>
        <div onClick={toggleDropDown} className={dropDown ? `${classes.dropDown} ${classes.rotate}`: classes.dropDown}>
          <DropDown />
        </div>
        {
          isOwner &&
          <div>
            {
              isOpen &&
              <ProfileReduxForm
                setFormVisible={setFormVisible}
                initialValues={profile}
                onSubmit={onSubmit} />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default ProfileInfo