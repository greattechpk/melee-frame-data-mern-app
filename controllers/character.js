/*  imports
 *
 */
const express = require('express')

const characterModel = require('../models/character.js')

const characterRouter = express.Router()

/*
 * 
 * TODO: Put all request handlers here
 */

 // GET ALL ROUTE
characterRouter.get('/', async (req, res) => {
  try {
      const allCharacters = await characterModel.getAllCharacters()
      res.json(allCharacters)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})
 
// GET ONE
characterRouter.get('/:characterId', async (req, res) => {
  try {
      const character = await characterModel.getCharacterById(req.params.characterId)
      res.json(character)
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// CREATE
characterRouter.post('/', async (req, res) => {
  try {
      await characterModel.create(req.body)
      res.json('ok')
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})

// UPDATE
characterRouter.put('/:characterId', async (req, res) => {
  try {
    console.log(req.body)
      await characterModel.update(req.params.characterId, req.body)
      res.json("ok")
  } catch (error) {
      res.statusCode(500).json(error)
      console.log(error)
  }
})


// DELETE
characterRouter.delete('/:characterId', async (req, res) => {
  try {
      await characterModel.deleteCharacter(req.params.characterId)
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
module.exports = characterRouter
