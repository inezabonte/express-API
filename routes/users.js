const express = require('express')
const router = express.Router()
const User = require('../models/User')

//gets all the users
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json({message: error})
    }
})


//submit a user
router.post('/', async (req, res) => {
    const user = new User({
       FirstName: req.body.FirstName,
       LastName: req.body.LastName,
       age: req.body.age
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)    
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router