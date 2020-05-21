import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Characters extends Component {
   
    state = {
        newCharacter: {
            name: '',
            portrait:'',
            tierLetter:'',
            description: ''
        },
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

    onChangeCharacter = (evt) => {
        const newState = { ...this.state }
        newState.newCharacter[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onDeleteCharacter = async (characterId) => { 
        await axios.delete(`api/character/${characterId}`)
        this.getAllCharacters()
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try{
            await axios.post('api/character', this.state.newCharacter)
            this.getAllCharacters()
        } catch (err){
            console.log('Failed to create new character')
            console.log(err)
        }
    }


    render() {
        return (
            <div>
                <h1>All Characters</h1>
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
