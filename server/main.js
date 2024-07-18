import express from 'express'
import cookieParser from 'cookie-parser'
import authenRoute from './routes/authenRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productsRoute from './routes/productsRoute.js'
import supplierRoute from './routes/suppliersRoute.js'
import purchaseRoute from './routes/purchaseRoute.js'
import customersRoute from './routes/customersRoute.js'

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
app.use(productsRoute)
app.use(supplierRoute)
app.use(purchaseRoute)
app.use(customersRoute)








app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))