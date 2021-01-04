import axios from 'axios'
import {ProfileType} from '../redux/reducers/profileReducer'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "649ff25f-1f88-41ba-8329-1b735f6cfb39"
  }
})

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number, search = '') {
    const str = search.toLowerCase()
    return instance.get(`users?page=${currentPage + 1}&count=${pageSize}&term=${str}`)
      .then(response => response.data)
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },
  unFollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  }
}

export enum ResultCode {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponse = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCode
  messages: Array<string>
}

type LoginResponse = {
  data: {
    userId: number
  }
  resultCode: ResultCode | ResultCodeForCaptcha
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponse>(`auth/me`)
  },
  login(email: string, password: string, rememberMe = true, captcha: null | string = null) {
    return instance.post<LoginResponse>(`auth/login`, {email, password, rememberMe, captcha})
        .then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, {status: status})
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)

    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfileInfo(profile: ProfileType) {
    return instance.put(`profile`, profile)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}

