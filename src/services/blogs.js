import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async (title, author, url, userToken) => {
  const response = await axios.post(baseUrl, {
    title: title,
    author: author,
    url: url
  }, {
    headers: {
      'Authorization': 'Bearer ' + userToken
    }
  })

  return response.data
}

export default { getAll, saveBlog }