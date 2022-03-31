const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req , res) => {
    res.send('ana kell l users')
})

module.exports = userRouter;




