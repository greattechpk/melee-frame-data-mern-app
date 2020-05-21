
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

const TierSchema = new mongoose.Schema({
    tierLetter: String
})

const TierModel = mongoose.model('tier', TierSchema)

function getAllTiers() {
    return TierModel.find({})
}

function getTierById(tierId) {
    return TierModel.findById(tierId)
}

function create(tierData) {
    return TierModel.create(tierData)
}

function update(tierId, tierData) {
    return TierModel.findByIdAndUpdate(tierId, tierData)
}

function deleteTier(tierId) {
    return TierModel.findByIdAndDelete(tierId)
}

//exports

module.exports = {
    getAllTiers,
    getTierById,
    create,
    update,
    deleteTier
}