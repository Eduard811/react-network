import React from 'react'
import classes from './Messages.module.scss'
import avatarImg from '../../../assets/img/avatar.png'
import MessageReduxForm from './MessageForm/MessageForm'
import {reset} from 'redux-form'
import Loader from '../../common/Loader/Loader'

const Messages = ({messages, sendMessage, profilePhoto}) => {

  const sendNewMessage = (value, dispatch) => {
    sendMessage(value.newMessageBody)
    dispatch(reset('dialogs'))
  }

  if (!profilePhoto) return <Loader />

  return (
    <div className={classes.dialogs__messages}>
      <div className={classes.dialogs__messages__element}>
        {
          messages.map((el, index) =>
            <div key={`${el.id}_${index}`} className={classes.element__wrapper}>
              <div className={classes.element__img}>
                <img src={el.name === 'You' ? profilePhoto.large : avatarImg} alt="" />
              </div>
              <div className={classes.element__message}>
                <span>{el.name}</span>
                <p>{el.message}</p>
              </div>
            </div>
          )
        }
      </div>
      <div className={classes.sendMessages}>
        <MessageReduxForm onSubmit={sendNewMessage} />
      </div>
    </div>
  )
}


export default Messages