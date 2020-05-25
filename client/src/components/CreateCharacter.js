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
        },
        tiers:[]
    }

    componentDidMount(){
        this.getTierInfo()
    }

    getTierInfo = async () =>{
        try{
            const res = await axios.get('api/tier')
            const newState = {...this.state}
            newState.tiers = res.data
            console.log(newState)
            this.setState(newState)
        } catch (err){
            console.log('Failed to get tier data')
            console.log(err)
        }
    }

    onSelectTier = (evt) => {
        const newState = {...this.state}
        newState.newCharacter.tierLetter = evt.target.value
        this.setState(newState)
        console.log(evt.target.value)
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
            console.log( this.state.newCharacter)
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
                <h1>(Admin)Create a Character</h1>
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
                        <select name='tier' id='tier' onChange={this.onSelectTier} value={this.state.tierLetter}>
                            {this.state.tiers.map((entry)=>{
                               return(<option value={entry.tierLetter}>{entry.tierLetter}</option>) 
                            })}
                        </select>
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
