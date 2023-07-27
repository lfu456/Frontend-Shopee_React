import { User } from "../types/user.type"

export const setAccessTokenToLS = (access_token: string) => {
    localStorage.setItem('access_token', access_token)
  }

export const getAccessTokenFromLs = () =>  localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''



export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLs = (profile:User) => {
  localStorage.setItem('profile',JSON.stringify(profile))
}

export const clearLs = () =>{
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')

} 