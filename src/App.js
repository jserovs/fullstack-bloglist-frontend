/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginButton from './components/LoginButton'
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

  const [user, setUser] = useState(null)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loginToken, setLoginToken] = useState('')

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
        console.log(JSON.stringify(result))
        setUser(result.name)
        setLoginToken(result.token)

      })
      .catch(error => {
        console.log(error)
      })

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <div>
            username: <input type='text' value={userName} onChange={handleUserNameChange} />
          </div>
          <div>
            password: <input type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <LoginButton text='Login' handleClick={loginButtonClicked} />
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>you are logged as {user}</h3>
      {blogs.map(blog => {
        console.log (JSON.stringify(blog))
        console.log ("current blog entry name: " + blog.user.name)
        console.log ("current user: " + user)
        if (blog.user.name === user) {
          return <Blog key={blog.id} blog={blog} user={user} />
        }
      }
      )}
    </div>
  )
}

export default App