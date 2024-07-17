import { addProduct, getAllProducts, updatingProduct, deleteProduct, overallProductCount, recentlyAddedProduct } from "../models/productsModel.js"


export const newProduct = async (req, res) => {
  try {
    const { productName, productStocks, productPrice, category, status } = req.body
    const image = req.file.buffer
    const imageSize = image.size


    const maxSizeInBytes = 5 * 1024 * 1024
    if (imageSize > maxSizeInBytes) {
      return res.status(400).json({ message: 'Image size exceeds the maximum allowed (5MB)' })
    }

  
    const productData = {
      name: productName,
      stocks: productStocks,
      price: productPrice,
      category: category,
      status: status,
      image: image
    }

    const result = await addProduct(productData)

    if (result && result.affectedRows > 0) {
      return res.status(201).json({ message: 'Product added successfully' })
    } else {
      return res.status(500).json({ message: 'Failed to add product' })
    }
  } catch (error) {
    console.error('Error adding product:', error.stack)
    res.status(500).json({ message: 'Failed to add product' })
  }
}


export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts()

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' })
    }

    return res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).json({ message: 'Failed to fetch products' })
  }
}



export const updateProduct = async (req, res) => {
  try {
    const { productId, productName, productPrice, productStocks, category, status } = req.body

    let controllerData = {
      id: productId,
      name: productName,
      price: productPrice,
      stocks: productStocks,
      category: category,
      status: status,
      image: null
    }

    if (req.file) {
      const imageFile = req.file.buffer
      controllerData['image'] = imageFile
    }

    const result = await updatingProduct(controllerData)

    console.log("Database result (controller)", result)

    if (!result || result.affectedRows === 0) {
      return res.status(400).json({ error: "Failed to update product" })
    }

    return res.status(200).json({ message: 'Product updated successfully' })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ message: 'Failed to update product' })
  }
}



export const removeProduct = async (req, res) => {
 try {
        const { id } = req.body

        const result = await deleteProduct(id)

        if(result.affectedRows === 0) return res.status(400).json({error : "Deleting failed"})
        
        return res.status(200).json({successMsg : "Deleted successfully"})

    } catch (error) {
         console.error(`Category controller error: ${error}`)
    }
}

export const totalProduct  = async (req, res) => {
  try {
    const products = await overallProductCount()

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' })
    }

    return res.status(200).json(products[0])
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).json({ message: 'Failed to fetch products' })
  }
}

export const recentAddProduct = async (req, res) =>{
  try {
    const products = await recentlyAddedProduct()

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found' })
    }

    return res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).json({ message: 'Failed to fetch products' })
  }
}