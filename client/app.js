import React, { Component } from 'react'
import Login from './Login'
import Generator from './Generator'

export class App extends Component {
    constructor () {
        super()
        this.state = {
            isLoggedIn: false
        }
    }
    render() {
        return (
            <div className='container'>
                {this.state.isLoggedIn ? <Generator /> : <Login /> }
            </div>
        )
    }
}

export default App
