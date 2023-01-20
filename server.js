require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const loginRoute = require('./routes/loginRoute')
const authMiddleware = require('./middleware/auth')
const app = express()
app.use(express.json())
app.use('/api', authMiddleware, userRoute)
app.use(loginRoute)
app.use( (req,res,next)=>{
   res.status(404).json({error:{message:'route undefined'}});
})
const port = process.env.PORT || 3000



mongoose.set('strictQuery', false)

console.log(process.env.MONGO_URI)

async function startServer(){
   mongoose.connect(process.env.MONGO_URI)
  app.listen(port, () => {
   console.log(`Server running on port ${port}`)
  })

}

startServer()



