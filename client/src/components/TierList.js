import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class TierList extends Component {

    state = {
        newTier: '',
        allTiers: []
    }
    componentDidMount() {
        this.getAllTiers()
    }

    getAllTiers = async () => {
        try {
            const res = await axios.get('api/tier')
            const newState = { ...this.state }
            newState.allTiers = res.data
            this.setState(newState)
            console.log(this.state.allTiers)
        } catch (err) {
            console.log('Failed to get all tiers')
            console.log(err)
        }
    }

    onChangeTier = (evt) => {
        const newState = { ...this.state }
        newState.newTier[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onDeleteTier = async (tierId) => {
        await axios.delete(`api/tier/${tierId}`)
        this.getAllTiers()
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('api/tier', this.state.newTier)
            this.getAllTiers()
        } catch (err) {
            console.log('Failed to create new tier')
            console.log(err)
        }
    }

    render() {
        return (
            <div className='tier-list'>
                {this.state.allTiers.map((tier) => {
                    return(
                        <div className='tier'>
                            <div className></div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
