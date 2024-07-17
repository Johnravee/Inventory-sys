import { Router } from 'express'
const router = Router()
import { newCategory, getCategories, updatedCategory, removeCategory, totalCategory } from '../controller/categoryController.js'


router.post('/api/category', newCategory)
router.get('/api/getallcategories', getCategories)
router.put('/api/updatecategory', updatedCategory)
router.delete('/api/deletecategory', removeCategory)
router.get('/api/totalcategory', totalCategory)

export default router