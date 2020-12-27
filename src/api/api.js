import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "649ff25f-1f88-41ba-8329-1b735f6cfb39"
  }
})

export const usersAPI = {
  getUsers(currentPage, pageSize, search = '') {
    const str = search.toLowerCase()
    return instance.get(`users?page=${currentPage + 1}&count=${pageSize}&term=${str}`)
      .then(response => response.data)
  },
  follow(userId) {
    return instance.post(`follow/${userId}`)
  },
  unFollow(userId) {
    return instance.delete(`follow/${userId}`)
  }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = true, captcha = false) {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)

    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfileInfo(profile) {
    return instance.put(`profile`, profile)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}

