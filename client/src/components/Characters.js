import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Characters extends Component {
   
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

    onDeleteCharacter = async (characterId) => { 
        await axios.delete(`api/character/${characterId}`)
        this.getAllCharacters()
    }




    render() {
        return (
            <div>
                <h1>All Characters</h1>
                {this.state.allCharacters.map((character) => {
                    
                    return (
                        <div>
                            <Link to={`/character/${character._id}`}>
                                <img className='char-portrait' src={character.portrait} alt={`${character.name}-melee-smash-bros`}/>
                                <div>{character.name}</div>
                            </Link>
                    <div>Tier: {character.tierLetter}</div>
                            <div>{character.description}</div>
                            <button onClick={() => this.onDeleteCharacter(character._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
