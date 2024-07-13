import express from 'express'
import cookieParser from 'cookie-parser'
import authenRoute from './routes/authenRoute.js'
import categoryRoute from './routes/categoryRoute.js'

import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true  
}

app.use(cors(corsOptions))


const port = 3000


app.use(authenRoute)
app.use(categoryRoute)








app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))