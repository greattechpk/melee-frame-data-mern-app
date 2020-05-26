import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import EditCharacter from './EditCharacter'
import CreateMove from './CreateMove'
import MoveListAdmin from './MoveListAdmin'

export default class AdminSingleCharacter extends Component {

    state = {
        character: {},
        updateView: false,
        addMoveView: false,
        redirect: false,
        tiers: []
    }

    componentDidMount() {
        this.getCharacterById()
        this.getTierInfo()
        this.getMovesByCharacterID()
    }

    getCharacterById = async () => {
        const characterId = this.props.match.params.characterId
        console.log('characterId', characterId)
        const res = await axios.get(`/api/character/${characterId}`)
        console.log(res.data)
        const newState = { ...this.state }
        newState.character = res.data
        this.setState(newState)
        console.log(this.state)
    }

    getMovesByCharacterID = async () =>{
        try{
            const res = await axios.get(`/api/move`)
            console.log(res.data)
        }catch (err){
            console.log(err)
        }
    }

    toggleUpdateView = async () => {
        const updateView = !this.state.updateView
        if (this.state.updateView === true) {

            try {
                const characterId = this.props.match.params.characterId
                console.log(this.state.character)
                const passState = this.state.character
                console.log(passState)
                await axios.put(`/api/character/${characterId}`, passState)
            } catch (err) {
                console.log('Put Err')
                console.log(err)
            }

        }
        this.setState({ updateView: updateView })
    }

    toggleAddMove = () => {
        const addMoveView = !this.state.addMoveView
        this.setState({ addMoveView: addMoveView })
    }

    onChangeCharacter = (evt) => {
        const newState = { ...this.state }
        newState.character[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    getTierInfo = async () => {
        try {
            const res = await axios.get('/api/tier')
            const newState = { ...this.state }
            newState.tiers = res.data
            this.setState(newState)
        } catch (err) {
            console.log('Failed to get tier data')
            console.log(err)
        }
    }

    onSelectTier = (evt) => {
        const newState = { ...this.state }
        newState.character.tierLetter = evt.target.value
        this.setState(newState)
        console.log(evt.target.value)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <h1>(Admin) Single Character</h1>
                <img className='char-portrait' src={this.state.character.portrait} alt={`${this.state.character.name}-melee`} />
                <div><span>Name:</span> {this.state.character.name}</div>
                <div><span>Description:</span> {this.state.character.description}</div>
                <div><span>Tier:</span> {this.state.character.tierLetter}</div>
                <div className='controls'>
                    <button onClick={this.toggleAddMove}>Add Move</button>
                    <button onClick={this.toggleUpdateView}>Edit</button>
                </div>

                {this.state.updateView ?
                    <EditCharacter
                        name={this.state.character.name}
                        description={this.state.character.description}
                        portrait={this.state.character.portrait}
                        onChangeCharacter={this.onChangeCharacter}
                        getTierInfo={this.getTierInfo}
                        tierLetter={this.state.character.tierLetter}
                        tiers={this.state.tiers}
                        onSelectTier={this.onSelectTier} />
                    : null}

                {this.state.addMoveView ?
                    <CreateMove
                        name={this.state.character.name} 
                        charId={this.state.character._id} />
                    : null}

                <MoveListAdmin characterId={this.state.character._id}/>
            </div>
        )
    }
}
