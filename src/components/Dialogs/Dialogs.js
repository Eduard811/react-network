import React from 'react'
import classes from './Dialogs.module.scss'
import DialogsUsers from './DialogsUsers/DialogsUsers.js'

const Dialogs = ({users}) => {

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__users}>
        <DialogsUsers users={users} />
      </div>
    </div>
  )
}

export default Dialogs