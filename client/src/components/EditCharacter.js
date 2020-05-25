import React, { Component } from 'react'

export default class editCharacter extends Component {
    
    render() {
        
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.props.name}
                            onChange={this.props.onChangeCharacter} />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.props.description}
                            onChange={this.props.onChangeCharacter} />
                    </div>
                    <div>
                        <label htmlFor="portrait">Portrait</label>
                        <input
                            type="text"
                            name="portrait"
                            value={this.props.portrait}
                            onChange={this.props.onChangeCharacter} />
                    </div>
                    <div>
                        <label htmlFor="tierLetter">Tier Letter</label>
                        <select name='tier' id='tier' onChange={this.props.onSelectTier} value={this.props.tierLetter}>
                            {this.props.tiers.map((entry)=>{
                               return(<option value={entry.tierLetter}>{entry.tierLetter}</option>) 
                            })}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}
