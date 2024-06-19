import axios from 'axios'

export const setTokenHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
