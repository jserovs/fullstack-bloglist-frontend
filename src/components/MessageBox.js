/* eslint-disable react/prop-types */
import React from 'react'

const MessageBox = (props) => (
  <div id='messageBox' className={props.message.style}>
    <b>{props.message.text}</b>
  </div>
)

export default MessageBox