import axios from 'axios'
const getAllUsers = '/api/users'
const loginAPI = '/api/login'

const getAll = () => {
  const request = axios.get(getAllUsers)
  return request.then(response => response.data)
}

const postLogin = (username, password) => {

    console.log('username: ' + username)
    console.log('password: ' + password)

    const postCall = axios.post(loginAPI, {
        username: username,
        password: password
      })
    return postCall.then(response => response.data)
  }

export default { getAll, postLogin }