import { deleteCustomer, getCustomers, insertCustomer, updateCustomerDetails } from "../models/customersModel.js"

export const newCustomer = async (req, res) =>{
    const data = req.body
    try {
        const result = await insertCustomer(data)

        if(result.affectedRows === 0) return res.status(400).json({error: "Error inserting"})

        return res.status(201).json({successMsg: "Insert success"})
    } catch (error) {
        console.error("Error inserting new customer (controller)", error)
    }
}

export const retrieveCustomers = async (req, res) =>{
    try {
        const result = await getCustomers()

         if(result.length > 0){
            return res.status(200).json(result)
        }
        else{
            return res.status(400).json({error: "Error fetching data"})
        }
    } catch (error) {
        console.error("Error fetching customer (controller)", error)
    }
}


export const changeCustomerDetails = async (req, res) => {
    const data = req.body

    try {
        const result = await updateCustomerDetails(data)

        if(result.affectedRows === 0 ) return res.status(400).json({error : "Edit error"})

        return  res.status(200).json({successMsg : "Edit success"})

    } catch (error) {
        console.error("Error  customer details change (controller)", error)
    }
}


export const removeCustomer = async (req, res) =>{
    const data = req.body

    try {
        const result = await deleteCustomer(data)

        if(result.affectedRows === 0 ) return res.status(400).json({error : "Edit error"})

        return  res.status(200).json({successMsg : "Delete success"})

    } catch (error) {
        console.error("Error removing customer (controller)", error)
    }
}