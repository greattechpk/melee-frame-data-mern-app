import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class CreateCharacter extends Component {

    state = {
        newCharacter: {
            name: '',
            portrait:'',
            tierLetter:'',
            description: ''
        }
    }

    onChangeCharacter = (evt) => {
        const newState = { ...this.state }
        newState.newCharacter[evt.target.name] = evt.target.value
        this.setState(newState)
    }
    
    onSubmit = async (evt) => {
        evt.preventDefault()
        try{
            await axios.post('api/character', this.state.newCharacter)
            const newState = {...this.state}
            newState.redirect = true
            this.setState(newState)
        } catch (err){
            console.log('Failed to create new character')
            console.log(err)
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/all-characters' />)
        }
        return (
            <div>
                <h1>Create a Character</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.newCharacter.name}
                            onChange={this.onChangeCharacter} />
                    </div>

                    <div>
                        <label htmlFor="portrait">Portrait</label>
                        <input
                            type="text"
                            name="portrait"
                            value={this.state.newCharacter.portrait}
                            onChange={this.onChangeCharacter} />
                    </div>

                    <div>
                        <label htmlFor="tierLetter">Tier Letter</label>
                        <input
                            type="text"
                            name="tierLetter"
                            value={this.state.newCharacter.tierLetter}
                            onChange={this.onChangeCharacter} />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.newCharacter.description}
                            onChange={this.onChangeCharacter} />
                    </div>

                    <input type="submit" value="Create Character" />
                </form>
            </div>
        )
    }
}
