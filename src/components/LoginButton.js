/* eslint-disable react/prop-types */
import React from 'react'

const LoginButton = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

export default LoginButton