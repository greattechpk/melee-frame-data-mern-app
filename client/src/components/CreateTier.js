import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default class createTier extends Component {

    state = {
        newTier:{
        tierLetter:''
        },
        redirect:false
    }

    onChangeTier = (evt) => {
        const newState = { ...this.state }
        newState.newTier[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const newState = {...this.state}
            newState.redirect = true
            this.setState(newState)
            await axios.post('api/tier', this.state.newTier)
        } catch (err) {
            console.log('Failed to create new tier')
            console.log(err)
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='tierLetter'>New Tier</label>
                        <input type='text' name='tierLetter' value={this.state.tierLetter}  onChange={this.onChangeTier}/>
                        <input type="submit" value="Create Tier" />
                    </div>
                </form>
            </div>
        )
    }
}
