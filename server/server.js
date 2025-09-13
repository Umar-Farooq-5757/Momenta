import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
connectDB()

app.get('/', (req, res) => {
  res.send('home page')
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
