import React, { Component } from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom'
import EditCharacter from './EditCharacter'

export default class SingleCharacter extends Component {

    state = {
        character:{
            name: '',
            description: ''
        },
        _id: '',
        updateView:false,
        redirect:false
    }

    onDeleteCharacter = async (characterId) => {
        console.log(this.state)
        await axios.delete(`/api/character/${characterId}`)
        const newState = { ...this.state }
        newState.redirect = true
        this.setState(newState)
    }

    componentDidMount() {
        this.getCharacterById()
    }

    getCharacterById = async () => {
        const characterId = this.props.match.params.characterId
        console.log('characterId', characterId)
        const res = await axios.get(`/api/character/${characterId}`)
        console.log(res.data)
        const newState ={...this.state}
        newState.character = res.data
        this.setState(newState)
    }
    toggleUpdateView = async () =>{
        const updateView = !this.state.updateView
        if(this.state.updateView === true){
            
            try{
                const characterId = this.props.match.params.characterId
                console.log(this.state.character)
                const passState =this.state.character
                console.log(passState)
                await axios.put(`/api/character/${characterId}`, passState).bind(this)
            }catch(err){
                console.log('Put Err')
                console.log(err)
            }
            
        }
        this.setState({updateView: updateView})
    }

    onChangeCharacter = (evt) => {
        const newState = { ...this.state }
        newState.character[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        }
        return (
            <div><Link to="/">Home</Link>
                <h1>Single Character</h1>
                <div>Name: {this.state.character.name}</div>
                <div>Description: {this.state.character.description}</div>
                <div className='controls'>
                    <button onClick={() => this.onDeleteCharacter(this.state.character._id)}>Delete</button>
                    <button onClick={this.toggleUpdateView}>Edit</button>
                </div>
                {this.state.updateView ? <EditCharacter name={this.state.character.name} description={this.state.character.description} onChangeCharacter={this.onChangeCharacter}/> : null}
            </div>
        )
    }
}
