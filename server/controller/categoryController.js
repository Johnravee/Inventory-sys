import { addCategory, getAllCategories, updateCategory, deleteCategory, categoryCounter } from "../models/categoryModel.js"


export const getCategories = async (req, res) =>{
    try {
        const result = await getAllCategories()

       if(!result.length > 0){
            return res.status(404).json({error : result.err})
       }


       return res.status(200).json(result)
        
    } catch (error) {
         console.error(`Category controller error: ${error}`)
    }
}

export const newCategory = async (req, res) =>{
    try {
        const { categoryName } = req.body

        const result = await addCategory(categoryName)

        if(result.errCode === 1062) return res.status(409).json({ error: result.err })

        if(result.err) return res.status(401).json({ error: result.err })

        
        return res.status(200).json({ successMsg: "New category added successfully." })
    } catch (error) {
        console.error(`Category controller error: ${error}`)
    }
}

export const updatedCategory = async (req, res) =>{
    try {
        const { categoryId, categoryName } = req.body
        const result = await updateCategory(categoryId, categoryName)
        
        if(result.affectedRows === 0) return res.status(400).json({error : "Set palang error handler"})
        
        return res.status(200).json({successMsg : "oks na ayusin nalang bukas"})

    } catch (error) {
        console.error(`Category controller error: ${error}`)
    }
}


export const removeCategory = async (req, res) =>{
    try {
        const { id } = req.body

        const result = await deleteCategory(id)

        if(!result.affectedRows > 0) return res.status(400).json({error : "Deleting failed"})
        
        return res.status(200).json({successMsg : "Deleted successfully"})

    } catch (error) {
         console.error(`Category controller error: ${error}`)
    }
}

export const totalCategory = async (req, res) => {
    try {
        const result = await categoryCounter()
        
        if (result.length === 0) {
            return res.status(404).json({ error: "No categories found" })
        }

        return res.status(200).json({ successMsg: "Categories counted", categories: result })
    } catch (error) {
        console.error(`Unexpected error from controller: ${error.message}`)
        return res.status(500).json({ error: error.message })
    }
}
