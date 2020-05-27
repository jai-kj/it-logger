const express = require('express')
const router = express.Router()

const Tech = require('../models/Tech')

//@route  GET api/techs
//@desc   Get all technicians
//@access Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find()
    res.json(techs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  POST api/techs
//@desc   Add a technician
//@access Public
router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body
  const newTech = new Tech({
    firstName,
    lastName
  })
  try {
    const tech = await newTech.save()
    res.json(tech)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  DELETE api/techs/:id
//@desc   Delete a technician
//@access Public
router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id)

    if(!tech) return res.status(404).json({ msg: 'Technician Not Found' })
    //delete technician
    await Tech.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Technician Deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router