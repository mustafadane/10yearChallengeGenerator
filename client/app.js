import React, { Component } from 'react'
import Login from './Login'
import Generator from './Generator'
import { Switch, Route } from 'react-router-dom'

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
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/gen' component={Generator} />
                    </Switch>
            </div>
        )
    }
}

export default App
