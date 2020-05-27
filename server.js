const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

//Connect to Database
connectDB()

//Initialize Middleware
app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/logs', require('./routes/logs'))
app.use('/api/techs', require('./routes/techs'))

//Set Static Assets in Production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})