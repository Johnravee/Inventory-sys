import { Router } from "express"
import { activeSuppliers, allSuppliers, eraseSupplier, modifySupplier, newSupplier } from "../controller/suppliersController.js"

const router = Router()

router.post('/api/addnewsupplier', newSupplier)
router.get('/api/allsuppliers', allSuppliers)
router.put('/api/editsupplier', modifySupplier)
router.delete('/api/deletesupplier', eraseSupplier)
router.get('/api/activesuppliers', activeSuppliers)
export default router