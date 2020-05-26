import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleCharacter extends Component {

    state = {
        character: {
            name: '',
            description: '',
            portrait: '',
            tierLetter: '',
            moves: []
        },
        moveType: ['Grounded', 'Smash', 'Tilt', 'Aerial', 'Special', 'Grab/Tether', 'Other']
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
        console.log(this.state.character)

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

                {this.state.character.moves ? <div>
                    <div>Moves:</div><br />
                    <div className='move-list'>

                        {this.state.moveType.map(type => {
                            console.log(type)
                            const tempMoves = this.state.character.moves.filter(move => move.type === type)
                            console.log(tempMoves)
                            if(tempMoves.length !== 0){
                                return (
                                    <div className='type-section'>
                                        <h1>{type}</h1>
                                        {tempMoves.map(move => (<div key={move._id}>
                                <div className='move'>
                                {move.gif ? <img className='move-gif' src={move.gif} /> : ''}
                                <div className='move-title'>{move.name}</div>
                                {move.type ? <div className='move-entry'><span className='move-entry-name'>Type: </span><span className='move-entry-data'>{move.type}</span></div> : ''}
                                {move.totalFrames ? <div className='move-entry'><span className='move-entry-name'>Total Frames: </span><span className='move-entry-data'>{move.totalFrames}</span></div> : ''}
                                {move.activeHit ? <div className='move-entry'><span className='move-entry-name'>Active Hit: </span><span className='move-entry-data'>{move.activeHit}</span></div> : ''}
                                {move.startUpFrames ? <div className='move-entry'><span className='move-entry-name'>Start Frames: </span><span className='move-entry-data'>{move.startUpFrames}</span></div> : ''}
                                {move.endFrames ? <div className='move-entry'><span className='move-entry-name'>End Frames: </span><span className='move-entry-data'>{move.endFrames}</span></div> : ''}
                                {move.iasa ? <div className='move-entry'><span className='move-entry-name'>IASA: </span><span className='move-entry-data'>{move.iasa}</span></div> : ''}
                                {move.autoCancel ? <div className='move-entry'><span className='move-entry-name'>Auto Cancels: </span><span className='move-entry-data'>{move.autoCancel}</span></div> : ''}
                                {move.landLag ? <div className='move-entry'><span className='move-entry-name'>Land Lag: </span><span className='move-entry-data'>{move.landLag}</span></div> : ''}
                                {move.lCanceled ? <div className='move-entry'><span className='move-entry-name'>L Cancel Lag: </span><span className='move-entry-data'>{move.lCanceled}</span></div> : ''}
                                {move.notes ? <div className='move-entry notes'><span className='move-entry-name'>Notes: </span><div className='move-entry-data-notes'>{move.notes}</div></div> : ''}
                            </div>
                            </div>))}
                                    </div>
                                )
                            }
                            
                        })}
                        {/* {this.state.character.moves.map((move, i) => (
                        <div key={i}>
                            <div className='move'>
                            {move.gif ? <img className='move-gif' src={move.gif} /> : ''}
                            <div className='move-title'>{move.name}</div>
                            {move.type ? <div className='move-entry'><span className='move-entry-name'>Type: </span><span className='move-entry-data'>{move.type}</span></div> : ''}
                            {move.totalFrames ? <div className='move-entry'><span className='move-entry-name'>Total Frames: </span><span className='move-entry-data'>{move.totalFrames}</span></div> : ''}
                            {move.activeHit ? <div className='move-entry'><span className='move-entry-name'>Active Hit: </span><span className='move-entry-data'>{move.activeHit}</span></div> : ''}
                            {move.startUpFrames ? <div className='move-entry'><span className='move-entry-name'>Start Frames: </span><span className='move-entry-data'>{move.startUpFrames}</span></div> : ''}
                            {move.endFrames ? <div className='move-entry'><span className='move-entry-name'>End Frames: </span><span className='move-entry-data'>{move.endFrames}</span></div> : ''}
                            {move.iasa ? <div className='move-entry'><span className='move-entry-name'>IASA: </span><span className='move-entry-data'>{move.iasa}</span></div> : ''}
                            {move.autoCancel ? <div className='move-entry'><span className='move-entry-name'>Auto Cancels: </span><span className='move-entry-data'>{move.autoCancel}</span></div> : ''}
                            {move.landLag ? <div className='move-entry'><span className='move-entry-name'>Land Lag: </span><span className='move-entry-data'>{move.landLag}</span></div> : ''}
                            {move.lCanceled ? <div className='move-entry'><span className='move-entry-name'>L Cancel Lag: </span><span className='move-entry-data'>{move.lCanceled}</span></div> : ''}
                            {move.notes ? <div className='move-entry notes'><span className='move-entry-name'>Notes: </span><div className='move-entry-data-notes'>{move.notes}</div></div> : ''}
                        </div>
                        </div>
                    ))} */}
                    </div>
                </div>
                    : null}


            </div>
        )
    }
}
