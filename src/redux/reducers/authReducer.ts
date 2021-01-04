import {authAPI, ResultCode, ResultCodeForCaptcha, securityAPI} from '../../api/api'
import {FormAction, stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionTypes} from '../store'

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
      ({type: 'SET_AUTH_USER_DATA', payload: {id, email, login, isAuth}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
  } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.me()
      if (response.data.resultCode === ResultCode.Success) {
        let {id, email, login} = response.data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
      }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)
      if (data.resultCode === ResultCode.Success) {
        await dispatch(getAuthUserData())
      } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
          await dispatch(getCaptchaUrl())
        }

        const message = data.messages.length > 0 ? data.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
      }
}

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
      }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer