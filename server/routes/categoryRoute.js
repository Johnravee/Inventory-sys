import { Router } from 'express'
const router = Router()
import { newCategory, getCategories, updatedCategory, removeCategory } from '../controller/categoryController.js'


router.post('/api/category', newCategory)
router.get('/api/getallcategories', getCategories)
router.put('/api/updatecategory', updatedCategory)
router.delete('/api/deletecategory', removeCategory)

export default router