const express =  require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const httpErrors = require('http-errors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://peter:peter@cluster0.2ptne.mongodb.net/firstDatabase').then(()=>{
    app.listen(8080, ()=>{
        console.log('connected to mongodb')
        console.log('listening on port 8080')
    })
})

const productRouter = require('./Routes/productroutes')
const userRouters = require('./Routes/user')
const req = require('express/lib/request')
const createError = require('http-errors')
const petRouter = require('./Routes/pet')


app.use('/product', productRouter)

app.use('/pet',petRouter )

app.use('/user', userRouters)

app.use((req,res,next)=>{

    next(createError(404,'not Found'))
})

app.use((err, req, res, next)=>{
    
    
  
    console.log("from app.js")
    res.status(err.status || 500).send({
            status :err.status || 500,
            message : err.message,
    })
   
})



