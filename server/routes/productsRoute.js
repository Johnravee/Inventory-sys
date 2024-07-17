import { Router } from 'express'
import { newProduct, getProducts, updateProduct, removeProduct, totalProduct, recentAddProduct } from "../controller/productsController.js";
import multer from 'multer'

const upload = multer()
const router = Router()


router.post('/api/addnewproduct', upload.single('image') ,newProduct)
router.get('/api/getproducts', getProducts)
router.put('/api/updateproduct', upload.single('productImage'),updateProduct)
router.delete('/api/deleteproduct', removeProduct)
router.get('/api/totalproduct', totalProduct)
router.get('/api/recentlyaddproduct', recentAddProduct)
export default router