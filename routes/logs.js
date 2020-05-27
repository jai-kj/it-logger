const express = require('express')
const router = express.Router()

const Log = require('../models/Log')

//@route  GET api/logs
//@desc   Get all system logs
//@access Public
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 })
    res.json(logs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  POST api/logs
//@desc   Add a log
//@access Public
router.post('/', async (req, res) => {
  const { tech, message, attention, date } = req.body
  const newLog = new Log({
    tech,
    message,
    attention,
    date
  })
  try {
    const log = await newLog.save()
    res.json(log)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  PUT api/logs/:id
//@desc   Update a log
//@access Public
router.put('/:id', async (req, res) => {
  const { tech, message, attention, date } = req.body

  //Build a Log Field Object
  const logFields = {}
  if(tech) logFields.tech = tech
  if(message) logFields.message = message
  if(attention) logFields.attention = attention
  if(date) logFields.date = date

  try {
    let log = await Log.findById(req.params.id)
    
    if(!log) return res.status(404).json({ msg: 'Log Not Found' })

    //Update Log
    log = await Log.findByIdAndUpdate(req.params.id, 
      { $set: logFields },
      { new: true }
    )

    res.json(log)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  DELETE api/logs/:id
//@desc   Delete a log
//@access Public
router.delete('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id)

    if(!log) return res.status(404).json({ msg: 'Log Not Found' })
    //delete log
    await Log.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Log Deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router