import { Router } from "express"
import { allSuppliers, eraseSupplier, modifySupplier, newSupplier } from "../controller/suppliersController.js"

const router = Router()

router.post('/api/addnewsupplier', newSupplier)
router.get('/api/allsuppliers', allSuppliers)
router.put('/api/editsupplier', modifySupplier)
router.delete('/api/deletesupplier', eraseSupplier)
export default router