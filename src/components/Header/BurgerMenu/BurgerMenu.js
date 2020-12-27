import React, {useState, useRef, useEffect} from 'react'
import classes from './BurgerMenu.module.scss'
import {NavLink} from 'react-router-dom'

const BurgerMenu = ({items}) => {

  const node = useRef()

  const [burgerState, setBurgerState] = useState(true)

  const burgerHandler = () => {
    setBurgerState(!burgerState)
  }

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(node.current)) {
      setBurgerState(true)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const [activeItem, setActiveItem] = useState(null)

  const onSelectItem = (index) => {
    setActiveItem(index)
    burgerHandler()
  }


  return (
    <div ref={node}>
      <div onClick={burgerHandler} className={classes.menuBurger + " " + (burgerState ? classes.off : classes.on)}>
        <span />
        <span />
        <span />
      </div>
      <div className={classes.navbar + " " + (burgerState ? "" : classes.active)}>
        <ul>
          <li onClick={() => onSelectItem(null)}
              className={activeItem === null ? classes.focus : classes.hover}><NavLink to="/">Profile</NavLink></li>
          {
            items.map((el, index) =>
              (<li key={`${el.items}_${index}`}
                   onClick={() => onSelectItem(index)}
                   className={activeItem === index ? classes.focus : classes.hover}>
                <NavLink to={el.links}>{el.items}</NavLink>
              </li>))
          }
        </ul>
      </div>
    </div>
  )
}

export default BurgerMenu