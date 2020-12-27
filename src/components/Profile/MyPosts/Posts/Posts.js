import React from 'react'
import classes from '../MyPosts.module.scss'
import avatarImg from '../../../../assets/img/avatar.png'
import Loader from '../../../common/Loader/Loader'
import Like from './Like/Like'

const Post = ({posts, like, dislike, profilePhoto}) => {

  if (!profilePhoto) return <Loader />

  return [...posts].reverse().map(el=>
    <div key={el.id} className={classes.posts}>
      <div className={classes.posts__avatar}>
        <img src={profilePhoto.large || avatarImg} alt=""/>
      </div>
      <div className={classes.posts__text}>
        <div className={classes.posts__text__message}>
          <p>{el.post}</p>
        </div>
        <div className={el.isLike ? `${classes.posts__text__like} ${classes.active}` : classes.posts__text__like}>
          <div onClick={el.isLike ? () => dislike(el.id) : () => like(el.id)}>
            <Like />
          </div>
          <span>{el.like}</span>
        </div>
      </div>
    </div>
  )
}

export default Post