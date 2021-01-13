/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import Button from './Button'
import Togglable from './Togglable'


const Blog = ({ blog }) => {

  // eslint-disable-next-line no-unused-vars
  const [showDetails, setShowDetails] = useState(false)

  const ref=React.createRef();

  return (
    <div id={blog.id} className='blogEntry'>
      <b>{blog.title}</b>
      <Togglable buttonLabel='show details' ref={ref}>
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes}</div>
          <div>{blog.author}</div>
        </div>
        
      </Togglable>

    </div>
  )

}
export default Blog
