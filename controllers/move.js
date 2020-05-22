/*  imports
 *
 */
const express = require('express')

const moveModel = require('../models/move.js')

const moveRouter = express.Router()

/*
 * 
 * TODO: Put all request handlers here
 */

 // GET ALL ROUTE
moveRouter.get('/', async (req, res) => {
  try {
      const allMoves = await moveModel.getAllMoves()
      res.json(allMoves)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})
 
// GET ONE
moveRouter.get('/:moveId', async (req, res) => {
  try {
      const move = await moveModel.getMoveById(req.params.moveId)
      res.json(move)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// CREATE
moveRouter.post('/', async (req, res) => {
  try {
      await moveModel.create(req.body)
      res.json('ok')
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// UPDATE
moveRouter.put('/:moveId', async (req, res) => {
  try {
    console.log(req.body)
      await moveModel.update(req.params.moveId, req.body)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})


// DELETE
moveRouter.delete('/:moveId', async (req, res) => {
  try {
      await moveModel.deleteMove(req.params.moveId)
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
module.exports = moveRouter
