const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect to Database
connectDB()

//Initialize Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Welcome to IT Logger API...'))

//Define Routes
app.use('/api/logs', require('./routes/logs'))
app.use('/api/techs', require('./routes/techs'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})