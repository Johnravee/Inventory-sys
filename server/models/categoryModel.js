import conn from '../connection/conn.js'

const errorHandler = (errorMsg, errorCodeNo) => {
    return { err: errorMsg, errCode : errorCodeNo }
}



export const addCategory = async (category) => {
    try {
        const queryCommand = "INSERT INTO category (Category) VALUES (?)"
        const [result] = await conn.execute(queryCommand, [category.toString()])

        if (!result.affectedRows > 0) {
            return errorHandler("Model: Failed to add category.", null)
        } else {
            return { message: "Model: Success to add new category." }
        }

    
    } catch (error) {
        if(error.errno === 1062){
            return errorHandler(`Failed to add category, Already exist.`)
        }else{
             return errorHandler(`Unexpected error, please try again later.`)
        }
    }
}


export const getAllCategories = async () =>{
       try {
        const queryCommand = "SELECT * FROM category ORDER BY id DESC"
        const [result] = await conn.execute(queryCommand)

        if(result.length > 0){
            return result
        }
    
    } catch (error) {
        if(error.errno === 1062){
            return errorHandler(`Failed to add category, Already exist.`)
        }else{
             return errorHandler(`Unexpected error, please try again later.`)
        }
    }
}


//!handle pa error
export const updateCategory = async (id, category) =>{
    try {
        const queryCommand = "UPDATE category SET Category = ? WHERE id = ?"
        const [result] = await conn.execute(queryCommand, [category.toString(), parseInt(id)])

        return result
    } catch (error) {
        console.error("Modal error", error)
    }
}

export const deleteCategory = async (id) => {
    try {  
        const queryCommand = "DELETE FROM category WHERE id = ?"

        const [result] = await conn.execute(queryCommand, [parseInt(id)])

        console.log('====================================')
        console.log(`ID received in controller: ${id}`)
        console.log('====================================')

        return result
    } catch (error) {
           console.error("Modal error", error)
    }
    
}