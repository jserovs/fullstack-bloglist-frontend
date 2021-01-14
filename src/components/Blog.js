/* eslint-disable react/prop-types */
import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog, loginToken, blogs, setBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogTitle = {
    fontWeight: 'bold'
  }

  const ref = React.createRef()

  const likeBlog = () => {
    console.log('I like this blog')
    blogService.likeBlog(blog, 1, loginToken)
      .then((postCall) => {
        console.log(JSON.stringify(postCall))
        const copy = [...blogs]
        copy[copy.findIndex((element) => element.id === blog.id)].likes++
        setBlogs(copy)
      })
  }

  const deleteBlog = () => {
    blogService.deleteBlog(blog, loginToken)
      .then((deleteCall) => {
        console.log(JSON.stringify(deleteCall))
        const copy = [...blogs]
        copy.splice(copy.findIndex((element) => element.id === blog.id), 1)
        setBlogs(copy)
      })
    console.log('I like this blog')
    console.log('I delete this blog')
  }

  return (
    <div id={blog.id} style={blogStyle}>
      <div className='blogTitle' style={blogTitle}>{blog.title}</div>
      <div className='blogAuthor'>{blog.author}</div>

      <Togglable buttonLabel='show details' ref={ref}>
        <div className='blogUrl'>{blog.url}</div>
        <div className='blogLikes'>likes: {blog.likes} <button onClick={likeBlog}>like</button></div>
        <div><button onClick={deleteBlog}>remove</button></div>
      </Togglable>
    </div>
  )

}

export default Blog
