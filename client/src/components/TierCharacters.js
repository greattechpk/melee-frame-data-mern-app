import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default class TierCharacters extends Component {
    state = {
        characters: []
    }

    componentDidMount() {
        this.getCharsByTier()
    }

    getCharsByTier = async () => {
        try {
            const res = await axios.get('/api/character')
            const newState = { ...this.state }
            const characters = res.data
            newState.characters = characters.filter((char) => {
                if(char.tierLetter === this.props.tierLetter){
                    return char
                }
            })

            this.setState(newState)
        } catch (err) {
            console.log('Failed to get chars by tier')
            console.log(err)
        }
    }

    render() {
        return (
            <div className='character-tier'>
                {this.state.characters.map((char)=>{
                    return(
                    <div className='char'>
                        <Link to={`/character/${char._id}`}>
                        <img className='char-portrait-tier' src={char.portrait} alt={`${char.name}-melee`}/>
                    <h3 className='tier-char-name'>{char.name}</h3>
                    </Link>
                    </div>
                    )
                })}
            </div>
        )
    }
}
