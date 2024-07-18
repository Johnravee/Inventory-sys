import { getOrdersList, getSalesProduct, insertBuyedProduct } from "../models/purchasesModel.js"


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
            

            console.log('====================================');
            console.log(JSON.parse(result[0].ordered_product.orders));
            console.log('====================================');

        return res.status(200).json(result)

    } catch (error) {
         console.error("Error fetching (controller) :", error)
    }
}