import {authAPI, securityAPI} from '../../api/api'
import {stopSubmit} from 'redux-form'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

type SetAuthUserDataPayloadType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}

type SetAuthUserDataType = {
  type: typeof SET_AUTH_USER_DATA,
  payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataType => ({
  type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}
})

type getCaptchaUrlSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me()
      if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
      }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrl())
        }

        const message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
      }
}

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout()
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url

  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer