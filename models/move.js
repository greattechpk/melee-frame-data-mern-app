
/* Step 1
 *
 * Import mongoose connection
 *
 */
const mongoose = require('./connection.js')

/* Step 2
 *
 * TODO: create model schema 
 *
 */

const MoveSchema = new mongoose.Schema({
    name:String,
    characterId:String,
    gif:String,
    notes:String,
    type:String,
    damage:Number,
    totalFrames:String,
    activeHit:String,
    startUpFrames:Number,
    endFrames:Number,
    iasa:Number,
    autoCancel:Number,
    landLag:Number,
    lCanceled:Number
})

const MoveModel = mongoose.model('move', MoveSchema)

function getAllMoves() {
    return MoveModel.find({})
}

function getMoveById(moveId) {
    return MoveModel.findById(moveId)
}

function create(moveData) {
    return MoveModel.create(moveData)
}

function update(moveId, moveData) {
    return MoveModel.findByIdAndUpdate(moveId, moveData)
}

function deleteMove(moveId) {
    return MoveModel.findByIdAndDelete(moveId)
}

//exports

module.exports = {
    getAllMoves,
    getMoveById,
    create,
    update,
    deleteMove
}