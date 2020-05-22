import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleCharacter extends Component {

    state = {
        character: {
            name: '',
            description: '',
            portrait: '',
            tierLetter: ''
        }
    }

    componentDidMount() {
        this.getCharacterById()
    }

    getCharacterById = async () => {
        const characterId = this.props.match.params.characterId
        console.log('characterId', characterId)
        const res = await axios.get(`/api/character/${characterId}`)
        const newState = { ...this.state }
        newState.character = res.data
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <h1>Single Character</h1>
                <img className='char-portrait' src={this.state.character.portrait} alt={`${this.state.character.name}-melee`} />
                <div><span>Name:</span> {this.state.character.name}</div>
                <div><span>Description:</span> {this.state.character.description}</div>
                <div><span>Tier:</span> {this.state.character.tierLetter}</div>
            </div>
        )
    }
}
