/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import MessageBox from './components/MessageBox'
import NewBlogForm from './components/NewBlogForm'
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {

      const blogUser = JSON.parse(loggedUserJSON)
      setUser(blogUser.name)
      setLoginToken(blogUser.token)
    }
  }, [])

  // userThat is logged in
  const [user, setUser] = useState(null)
  // token for user
  const [loginToken, setLoginToken] = useState()

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
        window.localStorage.setItem('BlogUser', JSON.stringify({username: userName, name: result.name, token: result.token}))
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
      <MessageBox text={message}/>
      <h1>blogs</h1>
      <div>{user} is logged!!! <Button text='logout' handleClick={logoutButtonClicked} /></div>

      <NewBlogForm setMessage={setMessage} setBlogs={setBlogs} blogs={blogs} loginToken={loginToken}/>
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