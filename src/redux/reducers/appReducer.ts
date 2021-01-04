import {getAuthUserData} from './authReducer'
import {InferActionTypes} from '../store'

const initialState = {
  initialized: false
}

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

const appReducer = (state= initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS' as const})
}

export const initializeApp = () => (dispatch: any) => {
  dispatch(getAuthUserData())
    .then(() => {
      dispatch(actions.initializedSuccess())
    })
}

export default appReducer