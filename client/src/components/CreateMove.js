import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class CreateMove extends Component {

    state = {
        newMove: {
            name: '',
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

    componentDidMount(){
        console.log(this.props.charId)
    }

    onSelectType = (evt) =>{
        const newState = {...this.state}
        newState.newMove.type = evt.target.value
        this.setState(newState)
        console.log(this.state)
    }
    onChangeText = evt =>{
        const newState = {...this.state}
        newState.newMove[evt.target.name]=evt.target.value
        console.log(this.props.charId)
        this.setState(newState)
        console.log(this.state.newMove[evt.target.name])
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try{
            console.log( this.state.newMove)
            const newState = {...this.state}
            newState.redirect = true
            this.setState(newState)
            await axios.post(`/api/character/${this.props.charId}/moves`, this.state.newMove)
        } catch (err){
            console.log('Failed to create new move')
            console.log(err)
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/admin-character/${this.props.charId}`} />)
        }

        return (
            <div>
                <h2>Create a move for {this.props.name}</h2>
                <form id='move-form' onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Move Name:</label>
                        <input type="text" name="name" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='gif'>.GIF url:</label>
                        <input type="text" name="gif" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='notes'>Notes:</label>
                        <textarea name='notes' form='move-form' onChange={this.onChangeText}>Enter notes here...</textarea>
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
                        <input type="number" name="totalFrames" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='activeHit'>Hit Boxes Active For:</label>
                        <input type="text" name="activeHit" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='startUpFrames'>Frames Before Hit Boxes:</label>
                        <input type="text" name="startUpFrames" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='endFrames'>Frames After Hit Boxes:</label>
                        <input type="text" name="endFrames"  onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='iasa'>IASA Frame:</label>
                        <input type="number" name="iasa" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='autoCancel'>Auto Cancel:</label>
                        <input type="text" name="autoCancel" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='landLag'>Landing Lag:</label>
                        <input type="number" name="landLag" onChange={this.onChangeText}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lCanceled'>L Cancel Landing Lag:</label>
                        <input type="number" name="lCanceled" onChange={this.onChangeText}></input>
                    </div>
                    <input type="submit" value="Create Move" />
                </form>
            </div>
        )
    }
}
