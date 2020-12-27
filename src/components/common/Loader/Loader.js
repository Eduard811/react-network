import React from 'react'
import classes from './Loader.module.scss'

const Loader = () =>
  <div className={classes.wrapper}>
    <div className={classes.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

export default Loader
