import React, {useEffect} from 'react'
import classes from './Users.module.scss'
import avatarImg from '../../assets/img/avatar.png'
import UserLoader from '../common/Loader/UserLoader'
import {NavLink, useHistory} from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import SearchReduxForm from './Search/Search'
import * as queryString from 'querystring'

const Users = (props) => {

  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1))

    let actualPage = props.currentPage
    let filter

    if (parsed.page) actualPage = Number(parsed.page - 1)
    if (parsed.term) {
      filter = {term: parsed.term}
    } else {
      filter = {term: ''}
    }

    props.getUsers(actualPage, props.pageSize, filter.term)
  }, [])

  useEffect(() => {

    const query = {}

    if (!!props.search) query.term = props.search
    if (props.currentPage + 1 !== 1) query.page = props.currentPage + 1

    history.push({
      pathname: '/find-user',
      search: queryString.stringify(query)
    })

    props.setQueryString(queryString.stringify(query))

  }, [props.search, props.currentPage])

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const onPageChanged = ({selected}) => {
    props.getUsers(selected, props.pageSize, props.search)
  }

  const onSubmit = (search) => {
    props.getUsers(0, props.pageSize, search.search);
  }

  return (
    <div className={classes.users}>
      <div className={classes.users__search}>
        <SearchReduxForm onSubmit={onSubmit} />
      </div>
      <div className={classes.users__wrap}>
        <div className={classes.users__container}>
          {props.isFetching
            ? Array(props.pageSize)
              .fill(0)
              .map((_, index) => <div key={index}><UserLoader /></div>)
            : props.users.map(user => (
              <div key={user.id} className={classes.users__info}>
                <NavLink to={"/profile/" + user.id}>
                  <img src={user.photos.small !== null ? user.photos.small : avatarImg} alt="" />
                </NavLink>
                <div className={classes.userName}>
                  <p>{user.name}</p>
                  {user.followed ?
                    <button
                      disabled={props.followingInProgress.some(id => id === user.id)}
                      onClick={() => {props.unfollow(user.id)}}
                      className="btn btn-secondary"
                    >Unfollow</button>
                    :
                    <button
                      disabled={props.followingInProgress.some(id => id === user.id)}
                      onClick={() => {props.follow(user.id)}}
                      className="btn btn-success"
                    >Follow</button>
                  }
                </div>
              </div>
            ))
          }
        </div>
        {
          props.totalUsersCount > props.pageSize
            ? <div style={{paddingTop: 15, paddingBottom: 15}}>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pagesCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={onPageChanged}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={props.currentPage}
              />
            </div> : null
        }
      </div>
    </div>
  )
}

export default Users