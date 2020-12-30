import {getAuthUserData} from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type InitialStateType = {
  initialized: boolean
}

const initialState = {
  initialized: false
}

const appReducer = (state= initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

type InitializedSuccessType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  dispatch(getAuthUserData())
    .then(() => {
      dispatch(initializedSuccess())
    })
}

export default appReducer