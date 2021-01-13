/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogs'

// eslint-disable-next-line no-unused-vars
const NewBlogForm = ({ setMessage, setBlogs, blogs, loginToken, setBlogAddForm }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogSave = (event) => {
    event.preventDefault()

    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {

      var blogUser = JSON.parse(loggedUserJSON)
    }
    var newBlog = {}
    blogService.saveBlog(title, author, url, loginToken)
      .then((result) => {
        newBlog = {
          title: result.title,
          author: result.author,
          url: result.url,
          user: {
            username: blogUser.username,
            name: blogUser.name,
            id: result.user
          }
        }

        let copy = [...blogs]
        copy.push(newBlog)
        setBlogs(copy)
        setMessage({ text: 'BLOG: ' + result.title + ' by ' + result.author + ' added sucesfully!', style: 'notification' })
        setTimeout(() => {
          setMessage({ text: null, style: '' })
        }, 5000)
        setBlogAddForm(false)
      })

      .catch(error => {
        console.log(error)
        setMessage({ text: 'blog could not be added', style: 'error' })
        setTimeout(() => {
          setMessage({ text: null, style: '' })
        }, 5000)
      })

    setAuthor('')
    setTitle('')
    setUrl('')



  }

  return (
    <form>
      <div>
                title:<input name="title" type="text" value={title || ''} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
                author:<input name="author" type="text" value={author || ''} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
                url:<input name="url" type="text" value={url || ''} onChange={e => setUrl(e.target.value)} />
      </div>
      <Button text='save' handleClick={newBlogSave} />
      <Button text='cancel' handleClick={() => setBlogAddForm(false)} />
    </form>
  )

}

export default NewBlogForm
