import { deleteOrder, getOrdersList, getPopularProducts, getSalesProduct, insertBuyedProduct } from "../models/purchasesModel.js"


export const addBuyedProduct = async (req, res) =>{
    const data = req.body
    try {
        const result = await insertBuyedProduct(data)

        if(result.affectedRows === 0) return res.status(400).json({error : "Insert error"})

        return res.status(201).json({successMsg : "Insert success"})
    } catch (error) {
        console.error("Error inserting (controller) :", error)
    }
}

export const retrieveSalesProduct = async (req, res) =>{
    try {
        const result = await getSalesProduct()


         if (!result || result.length === 0)  return res.status(404).json({ error: 'No products found' })


        return res.status(200).json(result)

    } catch (error) {
         console.error("Error fetching (controller) :", error)
    }
}


export const retrieveOrdersList = async (req, res) =>{
    try {
        const result = await getOrdersList()

         if (!result || result.length === 0)  return res.status(404).json({ error: 'No orders found' })
            
        return res.status(200).json(result)

    } catch (error) {
         console.error("Error fetching (controller) :", error)
    }
}

export const removeOrder = async (req, res) => {
    const data = req.body
    try {
        const result = await deleteOrder(data)

        if(!result) return res.status(404).json({ error: 'No orders found' })
            
        return res.status(200).json(result)
    } catch (error) {
          console.error("Error deleting order (controller) :", error)
    }
}



export const retrievePopularProducts = async (req, res) =>{
    try {
        const result = await getPopularProducts()

         if (!result || result.length === 0)  return res.status(404).json({ error: 'No product found' })
            

        return res.status(200).json(result)

    } catch (error) {
         console.error("Error fetching (controller) :", error)
    }
}