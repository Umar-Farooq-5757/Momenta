import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

// Create __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// serve uploads folder statically at /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('home page')
})
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
