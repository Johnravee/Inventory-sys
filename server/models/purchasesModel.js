import conn from '../connection/conn.js'

export const insertBuyedProduct = async (data) => {
    const jsonData = data

    try {
       //* update muna ng details sa product_list table before insert the order
   
  
            const queryCommand1 = 'SELECT * FROM product_list WHERE name = ? FOR UPDATE'
            const [productResult] = await conn.execute(queryCommand1, [jsonData.product])

            if (productResult.length > 0) {
                const product = productResult[0]
                const currentStock = product.stocks
                const updatedStock = currentStock - jsonData.qty

                const updateCommand = 'UPDATE product_list SET stocks = ? WHERE name = ?'
                await conn.execute(updateCommand, [updatedStock, jsonData.product])
            } 



        const queryCommand2 = 'INSERT INTO orders (customer, ordered_product, qty, bill_num, amount, created_at) VALUES (?, ?, ?, ?, ?, NOW())'
        const queryParameter = [jsonData.customer, jsonData.product, jsonData.qty, jsonData.billnum, jsonData.amount]

       const [insertResult] = await conn.execute(queryCommand2, queryParameter)

       if(insertResult) return insertResult

    } catch (error) {
   
        console.error("Error processing orders (model)", error)
    }
}


export const getSalesProduct = async () =>{
    try {
        const queryCommand = 'SELECT id, name, price FROM product_list WHERE status = "Active"'

        const [result] = await conn.execute(queryCommand)

        if(result) return result

    } catch (error) {
          console.error("Error ferching products (model)", error)
    }
}


export const getOrdersList = async () =>{
      try {
        const queryCommand = 'SELECT * FROM orders '

        const [result] = await conn.execute(queryCommand)

        if(result) return result
        
      } catch (error) {
        console.error("Error ferching orders (model)", error)
      }
}