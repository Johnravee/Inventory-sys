import { Router } from 'express'
const router = Router()

import { addBuyedProduct, removeOrder, retrieveOrdersList, retrievePopularProducts, retrieveSalesProduct } from '../controller/purchasesController.js'

router.post('/api/buyproduct', addBuyedProduct)
router.get('/api/salesproduct', retrieveSalesProduct)
router.get('/api/orderlists', retrieveOrdersList)
router.delete('/api/deleteorder', removeOrder)
router.get('/api/popularproduct', retrievePopularProducts)
export default router