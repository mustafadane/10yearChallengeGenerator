import React, { Component } from 'react'
import axios from 'axios'

export class Generator extends Component {
    constructor(){
        super()
        this.state = {
            accessToken: 0
        }
    }
    async componentDidMount() {
        const { data } = await axios.get('/token')
        this.setState({accessToken: data})
    }

    render() {
        return (
            <div>
                <div>This is Gen</div>
                <h1>This is accessToken: {this.state.accessToken}</h1>
            </div>
        )
    }
}

export default Generator
