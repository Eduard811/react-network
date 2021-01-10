import React, {useState, useEffect, useRef} from 'react'
import classes from './Header.module.scss'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/authReducer'
import {getProfilePhoto, setFormVisible} from '../../redux/reducers/profileReducer'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import HeaderPhoto from './HeaderPhoto/HeaderPhoto'
import {NavLink} from 'react-router-dom'

const Header = (props) => {

  const node = useRef()

  const [popupVisible, setPopupVisible] = useState(false)

  const togglePopupVisible = () => setPopupVisible(!popupVisible)

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(node.current)) {
      setPopupVisible(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const openProfileInfoForm = () => {
    props.setFormVisible(true)
    setPopupVisible(false)
  }

  return (
    <header>
      <div className={classes.header__logo}>
        <BurgerMenu
          items={[
            {items: "Find User", links: `/find-user${"?" + props.queryString}`},
            {items: "Messages", links:"/dialogs"},
            {items: "News", links:"/news"},
            {items: "Music", links: "/music"},
            {items: "Settings", links: "/settings"}
          ]}
        />
        <h1>React-Network</h1>
      </div>
      <div className={classes.header__profile}>
        <div ref={node} className={classes.header__profile__wrapper}>
          <div onClick={togglePopupVisible}>
            <HeaderPhoto
              authorizedUserId={props.authorizedUserId}
              profilePhoto={props.profilePhoto}
              getProfilePhoto={props.getProfilePhoto} />
          </div>
          {
            popupVisible &&
            <div className={classes.header__profile__popup}>
              <NavLink to="/profile">
                <button onClick={openProfileInfoForm}>Edit profile</button>
              </NavLink>
              <button onClick={props.logout}>Exit</button>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  authorizedUserId: state.auth.id,
  profilePhoto: state.profilePage.profilePhoto,
  queryString: state.usersPage.queryString
})

export default connect(mapStateToProps, {logout, getProfilePhoto, setFormVisible})(Header)