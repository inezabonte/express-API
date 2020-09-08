const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
// require('dotenv/config')

app.use(bodyParser.json())

//import posts routes
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)


//import users routes
const userRoute = require('./routes/users')
app.use('/users', userRoute)

//home route
app.get('/', (req, res) => {
    res.send('We are on home')
})

// Connect to DB
//The username and password are stored in a dotenv file for security
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to DB"))

const port  = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port} ...`)
})