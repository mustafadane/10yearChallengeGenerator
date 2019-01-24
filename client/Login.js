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
                <h1>This is Login</h1>
                <button onClick={this.handleClick} >Click Here To Start!</button>
            </div>
        )
    }
}

export default Login
