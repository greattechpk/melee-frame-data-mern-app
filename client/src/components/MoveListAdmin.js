import React, { Component } from 'react'
import axios from 'axios'


export default class MoveListAdmin extends Component {
    state={
        
    }


    render() {
        return (
            <div className='move-list-admin'>
                <h1>Moves:</h1>
                <div className='move-list'>
                {this.props.moves.map(move => {
                    console.log(move)
                    return(<div className='move'>
                        {move.gif ? <img className='move-gif' src={move.gif}/>: ''}
                        <div className='move-title'>{move.name}</div>
                        {move.type ? <div className='move-entry'><span className='move-entry-name'>Type: </span><span className='move-entry-data'>{move.type}</span></div>: ''}
                        {move.totalFrames ? <div className='move-entry'><span className='move-entry-name'>Total Frames: </span><span className='move-entry-data'>{move.totalFrames}</span></div>: ''}
                        {move.activeHit ? <div className='move-entry'><span className='move-entry-name'>Active Hit: </span><span className='move-entry-data'>{move.activeHit}</span></div>: ''}
                        {move.startUpFrames ? <div className='move-entry'><span className='move-entry-name'>Start Frames: </span><span className='move-entry-data'>{move.startUpFrames}</span></div>: ''}
                        {move.endFrames ? <div className='move-entry'><span className='move-entry-name'>End Frames: </span><span className='move-entry-data'>{move.endFrames}</span></div>: ''}
                        {move.iasa ? <div className='move-entry'><span className='move-entry-name'>IASA: </span><span className='move-entry-data'>{move.iasa}</span></div>: ''}
                        {move.autoCancel ? <div className='move-entry'><span className='move-entry-name'>Auto Cancels: </span><span className='move-entry-data'>{move.autoCancel}</span></div>: ''}
                        {move.landLag ? <div className='move-entry'><span className='move-entry-name'>Land Lag: </span><span className='move-entry-data'>{move.landLag}</span></div>: ''}
                        {move.lCanceled ? <div className='move-entry'><span className='move-entry-name'>L Cancel Lag: </span><span className='move-entry-data'>{move.lCanceled}</span></div>: ''}
                        {move.notes ? <div className='move-entry'><span className='move-entry-name'>Notes: </span><span className='move-entry-data'>{move.notes}</span></div>: ''}
                        <div className='controls'>
                            
                            <form>
                                <input type="submit" value="Delete" />
                            </form>
                        </div>
                    </div>)
                })}
                </div>
            </div>
        )
        
    }
}
