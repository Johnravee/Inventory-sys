import conn from "../connection/conn.js"

export const insertCustomer = async (data) => {
    const { name, email, contact } = data

    try {
        const queryCommand = "INSERT INTO customers (name, email, contact) VALUE (?, ?, ?)"
        const [result] = await conn.execute(queryCommand, [name, email, contact])
        
        if(result) return  result
    } catch (error) {
         console.error("Error inserting new customer (model)", error)
    }

}


export const getCustomers = async () =>{
      try {
        const queryCommand = "SELECT * FROM customers"
        const [result] = await conn.execute(queryCommand)
        
        if(result) return  result

    }catch (error) {
         console.error("Error inserting new customer (model)", error)
    }
}

export const updateCustomerDetails = async (data) => {
    const { id, name, email, contact } =data

    try {
        const queryCommand = "UPDATE customers SET name = ?, email = ?, contact = ? WHERE id = ?"
        const [result] = await conn.execute(queryCommand, [name, email, contact, id])
        
        if(result) return  result

    } catch (error) {
          console.error("Error updating  customer details (model)", error)
    }
}

export const deleteCustomer = async (data) =>{
    const { id } = data

   
    try {
        const queryCommand = "DELETE FROM customers WHERE id = ?"
        const [result] = await conn.execute(queryCommand, [id])
        
        if(result) return result

    } catch (error) {
          console.error("Error deleting  customer (model)", error)
    }
}