import conn from '../connection/conn.js'

export const addProduct = async (datas) => {
  try {
    const { name, image, category, stocks, price, status } = datas

    console.log(datas);



    const queryCommand = 'INSERT INTO product_list (name, image, category, stocks, price, status) VALUES (?, ?, ?, ?, ?, ?)'
    const values = [name, image, category, stocks, price, status]

    const [result] = await conn.execute(queryCommand, values)

    console.log('Product added, model result:', result)

    return result 

  } catch (error) {
    console.error(`Error inserting new product (model): ${error}`)
  }
}



export const getAllProducts = async () => {
  try {
    const queryCommand = "SELECT * FROM product_list ORDER BY id DESC"
    const [results] = await conn.execute(queryCommand)

    const products = results.map(result => ({
      id: result.id,
      name: result.name,
      image: result.image.toString('base64'),
      category: result.category,
      stocks: result.stocks,
      price: result.price,
      status: result.status
    }))

    console.log('Fetched products:', products.length)

    return products
  } catch (error) {
    console.error('Error fetching products (model):', error)
  }
}


export const updatingProduct = async (data) => {
  try {
    const { id, name, price, stocks, category, status, image } = data

    let queryCommand = `UPDATE product_list SET name = ?, category = ?, stocks = ?, price = ?, status = ?`
    let queryParams = [name, category, stocks, price, status]

    if (image) {
      queryCommand += `, image = ?`
      queryParams.push(image)
    }

    queryCommand += ` WHERE id = ?`
    queryParams.push(id)

    const [result] = await conn.execute(queryCommand, queryParams)

    if(result){
      return result
    }

  } catch (error) {
    console.error('Error updating product (model):', error)
   
  }
}

export const deleteProduct = async (id) => {
    try {  
        const queryCommand = "DELETE FROM product_list WHERE id = ?"

        const [result] = await conn.execute(queryCommand, [parseInt(id)])

        console.log('====================================')
        console.log(`ID received in controller: ${id}`)
        console.log('====================================')

        return result
    } catch (error) {
           console.error("Modal error", error)
    }
    
}

export const overallProductCount = async () =>{
   try {
    const queryCommand = "SELECT COUNT(*) as totalProduct FROM `product_list`"
    const [results] = await conn.execute(queryCommand)

    console.log('Counted products:', results)

    return results
  } catch (error) {
    console.error('Error counting products (model):', error)
  }
}

export const recentlyAddedProduct = async () => {
    try {
    const queryCommand = "SELECT id, name, category, stocks FROM `product_list` ORDER BY id DESC LIMIT 5"
    const [results] = await conn.execute(queryCommand)

    console.log('Recently added products:', results)

    return results
  } catch (error) {
    console.error('Error fetching recently added products (model):', error)
  }
}


