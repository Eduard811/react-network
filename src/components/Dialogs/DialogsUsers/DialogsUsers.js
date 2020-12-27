import React from 'react'
import classes from './DialogsUsers.module.scss'
import avatarImg from '../../../assets/img/avatar.png'
import {NavLink} from 'react-router-dom'

const DialogsUsers = ({users}) =>
      users.map((el, index) =>
        <NavLink key={`${el.id}_${index}`} to={`/dialogs/${el.id}`}>
          <div className={classes.dialogs__users__items}>
            <div className={classes.items__img}>
              <img src={avatarImg} alt="" />
            </div>
            <div className={classes.items__name}>
              <p>{el.name}</p>
            </div>
          </div>
        </NavLink>)

export default DialogsUsers