import React, {useEffect, useRef, useState} from 'react'
import classes from './ProfileStatus.module.scss'

const ProfileStatus = (props) => {

  const node = useRef()

  const [popupVisible, setPopupVisible] = useState(false)
  const [profileStatus, setProfileStatus] = useState(props.status)

  useEffect(() => {
    setProfileStatus(props.status)
  }, [props.status])

  const togglePopupVisible = () => setPopupVisible(!popupVisible)

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(node.current)) {
      setPopupVisible(false)
    }
  }

  const onUpdateStatus = () => {
    props.updateStatus(profileStatus)
    setPopupVisible(false)
  }

  const onChangeStatus = (e) => {
    if (e.target.value.length <= 30) {
      setProfileStatus(e.target.value)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div ref={node} className={classes.profileStatus}>
      <div style={{marginLeft: 2}} onClick={togglePopupVisible}>{props.status || 'изменить статус'}</div>
      {popupVisible &&
      <div className={classes.profileStatus__popup}>
        <input
          onChange={onChangeStatus}
          value={profileStatus}
          type="text"
          placeholder="change status..."
          className="form-control"
        />
        <button onClick={onUpdateStatus} className="btn btn-success">Send</button>
      </div>
      }
    </div>
  )
}

export default ProfileStatus