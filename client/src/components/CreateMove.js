import React, { Component } from 'react'
import axios from 'axios'

export default class CreateMove extends Component {

    state = {
        newMove: {
            name: '',
            characterId: this.props.characterId,
            gif: '',
            notes: '',
            type: '',
            totalFrames: '',
            activeHit: '',
            startUpFrames: '',
            endFrames: '',
            iasa: '',
            autoCancel: '',
            landLag: '',
            lCanceled: ''
        },
        moveType:['Grounded','Smash','Tilt','Aerial','Special','Grab/Tether','Other'],
        redirect:false
    }

    onSelectType = (evt) =>{
        const newState = {...this.state}
        newState.newMove.type = evt.target.value
        this.setState(newState)
        console.log(this.state)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try{
            await axios.post('api/move', this.state.newMove)
            console.log( this.state.newMove)
            const newState = {...this.state}
            newState.redirect = true
            this.setState(newState)
        } catch (err){
            console.log('Failed to create new character')
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <h2>Create a move for {this.props.name}</h2>
                <form id='move-form' onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Move Name:</label>
                        <input type="text" name="name"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='gif'>.GIF url:</label>
                        <input type="text" name="gif"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='notes'>Notes:</label>
                        <textarea name='notes' form='move-form'>Enter notes here...</textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Type:</label>
                        <select onChange={this.onSelectType} name='type' id='type' value={this.state.newMove.type}>
                            {this.state.moveType.map(option =>{
                                return (
                                <option value={option}>{option}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='totalFrames'>Total Frames:</label>
                        <input type="number" name="totalFrames"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='activeHit'>Hit Boxes Active For:</label>
                        <input type="text" name="activeHit"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='startUpFrames'>Frames Before Hit Boxes:</label>
                        <input type="text" name="startUpFrames"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='endFrames'>Frames After Hit Boxes:</label>
                        <input type="text" name="endFrames"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='iasa'>IASA Frame:</label>
                        <input type="number" name="iasa"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='autoCancel'>Auto Cancel:</label>
                        <input type="text" name="autoCancel"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='landLag'>Landing Lag:</label>
                        <input type="number" name="landLag"></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lCanceled'>L Cancel Landing Lag:</label>
                        <input type="number" name="lCanceled"></input>
                    </div>
                    <input type="submit" value="Create Move" />
                </form>
            </div>
        )
    }
}
