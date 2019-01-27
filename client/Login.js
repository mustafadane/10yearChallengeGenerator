import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Login extends Component {
    handleClick = async () => {
        await axios.get('/auth/login')
    }

    render() {
        return (
            <div>
                <h1>Auto 10 Year Challenge Generator</h1>
                <h2>Start with loging in with Facebook</h2>
                <button><a href='/auth/login'>Start here!</a></button>
            </div>
        )
    }
}

export default Login
