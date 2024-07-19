import { addNewSupplier, deleteSupplier, getAllSuppliers, updateSupplier, getActiveSuppliers } from "../models/suppliersModel.js"


export const newSupplier = async (req, res) =>{
    const data = req.body

    try {
        
        const result = await addNewSupplier(data)

        console.log('====================================')
        console.log("Result from controller", result)
        console.log('====================================')

        if(result.affectedRows === 0) return res.status(400).json({Error : "Error submit"})

        res.status(200).json({success : 'Success submit'})

    } catch (error) {
         console.error('Error adding new supplier (controller):', error)
    }
}

export const allSuppliers = async (req, res) => {
    try {
        const result = await getAllSuppliers()

        if(!result.length > 0 ) return res.status(400).json({errorMsg : "Failed to fetch data"})

        return res.status(200).json(result)
        
    } catch (error) {
         console.error('Error fetch  supplier (controller):', error)
    }
}

export const modifySupplier = async (req, res) =>{
    const data = req.body
    try {
        const result = await updateSupplier(data)

        if(result.affectedRows === 0) return res.status(400).json({error : "Error updating supplier"})

        
        return res.status(200).json({successMsg : "Success updating supplier"})

    } catch (error) {
         console.error('Error modifying  supplier (controller):', error)
    }
}

export const eraseSupplier = async (req, res) => {
    const data = req.body
     try {
        const result = await deleteSupplier(data)

        if(!result) return res.status(400).json({error : "Error updating supplier"})

        
        return res.status(200).json({successMsg : "Success deleting supplier"})

    } catch (error) {
         console.error('Error deleting  supplier (controller):', error)
    }
}


export const activeSuppliers = async (req, res) => {
    try {
        const result = await getActiveSuppliers()

        if(!result.length > 0 ) return res.status(400).json({errorMsg : "Failed to fetch data"})

        return res.status(200).json(result)
        
    } catch (error) {
         console.error('Error fetch  supplier (controller):', error)
    }
}
