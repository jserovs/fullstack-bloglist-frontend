/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import Button from './Button'
import Togglable from './Togglable'


const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // eslint-disable-next-line no-unused-vars
  const [showDetails, setShowDetails] = useState(false)

  const ref=React.createRef();



  const likeBlog = () => {
    console.log('I like this blog')
  }

  const deleteBlog = () => {
    console.log('I like this blog')
    console.log('I delete this blog')
  }

  return (
    <div id={blog.id} style={blogStyle}>
      <b>{blog.title}</b>
      <Togglable buttonLabel='show details' ref={ref}>
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={likeBlog}>like</button></div>
          <div>{blog.author}</div>
          <div><button onClick={deleteBlog}>remove</button></div>
        </div>
      </Togglable>

    </div>
  )

}
export default Blog
