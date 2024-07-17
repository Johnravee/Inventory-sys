import conn from "../connection/conn.js"

export const addNewSupplier = async (data) =>{
    const { name, email, contact, address, status } = data
    
    try {
        const queryCommand = "INSERT INTO suppliers (name, email, contact, address, status) VALUES(?, ?, ?, ?, ?)"
        const [result] = await conn.execute(queryCommand, [name, email, contact, address, status])

        console.log('====================================')
        console.log("Result from executing a query (model)", result)
        console.log('====================================')

        return result
        
    } catch (error) {
        console.error('Error adding new supplier (model):', error)
    }
}
export const getAllSuppliers = async () =>{
    try {
        const queryCommand = "SELECT * FROM suppliers ORDER BY id DESC"
        const [result] = await conn.execute(queryCommand)

        console.log('====================================')
        console.log("Result from executing a query (model)", result)
        console.log('====================================')

        return result
        
    } catch (error) {
        console.error('Error fetch supplier (model):', error)
    }
}

export const updateSupplier = async (data) =>{

    const { id, name, email, contact, address, status } = data
    try {
        const queryCommand = "UPDATE `suppliers` SET `name`= ?,`email`= ?,`contact`=? ,`address`= ?,`status`= ? WHERE id = ?"
        const [result] = await conn.execute(queryCommand, [name, email, contact, address, status, id])

        console.log('====================================')
        console.log("Result from executing a query (model)", result)
        console.log('====================================')

        return result
        
    } catch (error) {
        console.error('Error fetch supplier (model):', error)
    }
}

export const deleteSupplier = async (data) =>{
    const { id } = data
    try {
        const queryCommand = "DELETE FROM `suppliers` WHERE id = ?"
        const [result] = await conn.execute(queryCommand, [id])

        console.log('====================================')
        console.log("Result from executing a query (model)", result)
        console.log('====================================')

        return result
        
    } catch (error) {
        console.error('Error fetch supplier (model):', error)
    }

}