import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
connectDB()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('home page')
})
app.use('/api/user',userRouter)

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
