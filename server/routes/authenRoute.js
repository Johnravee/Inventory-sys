import { Router } from 'express'
import { loginAuth, sign_up, recovery, logout, getAccount } from '../controller/userController.js'

const router = Router()


//*Login authentication route
router.post('/api/login', loginAuth)
router.post('/api/sign_up', sign_up)
router.post('/api/recover', recovery)
router.post('/api/getaccount', getAccount)
router.get('/api/loggingout', logout)
export default router