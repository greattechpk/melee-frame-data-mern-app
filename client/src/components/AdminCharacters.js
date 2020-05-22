import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class AdminCharacters extends Component {

    state = {
        allCharacters: []
    }

    componentDidMount() {
        this.getAllCharacters()
    }

    getAllCharacters = async () => {
        try {
            const res = await axios.get('api/character')
            const newState = { ...this.state }
            newState.allCharacters = res.data
            this.setState(newState)
            console.log(this.state.allCharacters)
        } catch (err) {
            console.log('Failed to get all characters')
            console.log(err)
        }
    }





    render() {
        return (
            <div>
                <h1>(Admin) All Characters</h1>
                {this.state.allCharacters.map((character) => {

                    return (
                        <div>
                            <Link to={`/admin-character/${character._id}`}>
                                <img className='char-portrait' src={character.portrait} alt={`${character.name}-melee-smash-bros`} />
                                <div>{character.name}</div>
                            </Link>
                            <div>Tier: {character.tierLetter}</div>
                            <div>{character.description}</div>
                           </div>
                    )
                })}
            </div>
        )
    }
}
