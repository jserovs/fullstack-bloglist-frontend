/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogs'

// eslint-disable-next-line no-unused-vars
const NewBlogForm = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const newBlogSave = (event) => {
        event.preventDefault()

        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {

            var blogUser = JSON.parse(loggedUserJSON)
        }
        var newBlog = {};
        blogService.saveBlog(title, author, url, props.loginToken)
            .then((result) => {
                console.log("result.data= " + JSON.stringify(result))
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
                console.log("newBlog" + JSON.stringify(newBlog));
                let copy = [...props.blogs]
                copy.push(newBlog)
                console.log("COPY array" + JSON.stringify(copy))
                props.setBlogs(copy)
                console.log("BLOGS array" + JSON.stringify(props.blogs))
            })

        setAuthor('')
        setTitle('')
        setUrl('')

        props.setMessage('pressed the button')
        setTimeout(() => {
            props.setMessage(null)
        }, 5000)
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
        </form>
    );

}

export default NewBlogForm
