/*  imports
 *
 */
const express = require('express')

const tierModel = require('../models/tier.js')

const tierRouter = express.Router()

/*
 * 
 * TODO: Put all request handlers here
 */

 // GET ALL ROUTE
tierRouter.get('/', async (req, res) => {
  try {
      const allTiers = await tierModel.getAllTiers()
      res.json(allTiers)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})
 
// GET ONE
tierRouter.get('/:tierId', async (req, res) => {
  try {
      const tier = await tierModel.getTierById(req.params.tierId)
      res.json(tier)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// CREATE
tierRouter.post('/', async (req, res) => {
  try {
      await tierModel.create(req.body)
      res.json('ok')
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// UPDATE
tierRouter.put('/:tierId', async (req, res) => {
  try {
    console.log(req.body)
      await tierModel.update(req.params.tierId, req.body)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})


// DELETE
tierRouter.delete('/:tierId', async (req, res) => {
  try {
      await tierModel.deleteTier(req.params.tierId)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

/* 
 *
 * Export the router from the file.
 *
 */
module.exports = tierRouter
