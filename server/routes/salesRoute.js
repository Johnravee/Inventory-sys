import { Router } from 'express'
import { retrieveMonthlySales, retrieveOverallSales, retrieveWeeklySales, retrieveYearlySales } from '../controller/salesController.js'
const router = Router()

router.get('/api/getweeklysales', retrieveWeeklySales)
router.get('/api/getmonthlysales', retrieveMonthlySales)
router.get('/api/getyearlysales', retrieveYearlySales)
router.get('/api/overallsales', retrieveOverallSales)


export default router 