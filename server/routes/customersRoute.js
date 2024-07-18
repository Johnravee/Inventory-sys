import { Router } from 'express'
import { changeCustomerDetails, newCustomer, removeCustomer, retrieveCustomers } from '../controller/customersController.js'


const router = Router()

router.post('/api/newcustormer', newCustomer)
router.get('/api/allcustomers', retrieveCustomers)
router.put('/api/updatecustomer', changeCustomerDetails)
router.delete('/api/deletecustomer', removeCustomer)

export default router