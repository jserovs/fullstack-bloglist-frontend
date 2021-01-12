/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/LoginButton'
import MessageBox from './components/MessageBox'
import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    }
    )
  }, [])

  // userThat is logged in
  const [user, setUser] = useState(window.localStorage.getItem('name'))
  // token for user
  const [loginToken, setLoginToken] = useState(window.localStorage.getItem('token'))

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginButtonClicked = (event) => {
    event.preventDefault()

    userService.postLogin(userName, password)
      .then(result => {
        setUser(result.name)
        setLoginToken(result.token)
        window.localStorage.setItem('name', result.name)
        window.localStorage.setItem('user', result.username)
        window.localStorage.setItem('token', result.token)
      })
      .catch(error => {
        console.log(error)
        setMessage('Wrong credentials')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const logoutButtonClicked = (event) => {
    event.preventDefault()

    setUser(null)
    setLoginToken()
    window.localStorage.clear()

  }

  if (user === null) {
    return (
      <div>
        <h1>blogs</h1>
        <h2>Log in to application</h2>
        <MessageBox text={message}/>
        <form>
          <div>
            username: <input type='text' value={userName} onChange={handleUserNameChange} />
          </div>
          <div>
            password: <input type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <Button text='Login' handleClick={loginButtonClicked} />
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <div>{user} is logged!!! <Button text='logout' handleClick={logoutButtonClicked} /></div>

      {blogs.map(blog => {
        if (blog.user.name === user) {
          return <Blog key={blog.id} blog={blog} user={user} />
        }
      }
      )}
    </div>
  )
}

export default App