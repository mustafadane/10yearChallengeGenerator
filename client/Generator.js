import React, { Component } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'

export class Generator extends Component {
    constructor(){
        super()
        this.state = {
            accessToken: 0,
            isLoading: true,
            oldUrl: '',
            newUrl: ''
        }
    }
    async componentDidMount() {
        const { data:accessToken } = await axios.get('/token')
        const { data: old } = await axios.get(`https://graph.facebook.com/v3.2/me/photos?fields=images&since=2009-01-01&until=2010-01-01&access_token=${accessToken}`)

        const { data: now } = await axios.get(`https://graph.facebook.com/v3.2/me/photos?fields=images&since=2018-01-01&until=now&access_token=${accessToken}`)

        // console.log(old.data[Math.floor(Math.random() * old.data.length)])
        // console.log(now.data)

        const filterCb = element => {
            return element.height > 400 && element.height < 500
        }


        const oldUrl = old.data[Math.floor(Math.random() * old.data.length)].images.filter(filterCb)[0].source
        const newUrl = now.data[Math.floor(Math.random() * now.data.length)].images.filter(filterCb)[0].source

        this.setState({oldUrl, newUrl, isLoading: false, accessToken})
    }

    handleClick = async () => {
        this.setState({isLoading: true})
        const { data: old } = await axios.get(`https://graph.facebook.com/v3.2/me/photos?fields=images&since=2009-01-01&until=2010-01-01&access_token=${this.state.accessToken}`)

        const { data: now } = await axios.get(`https://graph.facebook.com/v3.2/me/photos?fields=images&since=2018-01-01&until=now&access_token=${this.state.accessToken}`)

        // console.log(old.data[Math.floor(Math.random() * old.data.length)])
        // console.log(now.data)

        const filterCb = element => {
            return element.height > 400 && element.height < 500
        }


        const oldUrl = old.data[Math.floor(Math.random() * old.data.length)].images.filter(filterCb)[0].source
        const newUrl = now.data[Math.floor(Math.random() * now.data.length)].images.filter(filterCb)[0].source

        this.setState({oldUrl, newUrl, isLoading: false})
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div>
                    <h1>Your 10 Year Challange is being prepared...</h1>
                    <ReactLoading type='spinningBubbles' color='white' height={350} width={350} />
                </div>
            )
        }
        return (
            <div>
                <h1>Here is your #10YearChallenge :)</h1>
                <div className='final'>
                    <div className='imageContainer'>
                        <img src={this.state.oldUrl} />
                    </div>
                    <div className='imageContainer'>
                        <img src={this.state.newUrl} />
                    </div>
                </div>
                <br></br>
                <button onClick={this.handleClick}>I don't like it!</button>
            </div>
        )
    }
}

export default Generator
