import {createStore, compose, applyMiddleware, Action} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'

import {rootReducer, RootState} from './reducers/rootReducers'

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store

