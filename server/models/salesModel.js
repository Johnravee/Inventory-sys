import conn from "../connection/conn.js"


export const getWeeklySales = async () =>{
    try {
        const queryCommand = "SELECT ordered_product AS product, SUM(amount) AS sales, SUM(qty) AS qty FROM orders WHERE WEEK(created_at) GROUP BY ordered_product"

        const [result] = await conn.execute(queryCommand)

        if(result) return result
    } catch (error) {
       console.error("Error fetching weekly sales (model)", error)
    }
}


export const getMonthlySales = async () =>{
    try {
        const queryCommand = "SELECT ordered_product AS product, SUM(amount) AS sales, SUM(qty) AS qty, DATE_FORMAT(created_at, '%M') AS month_name,DATE_FORMAT(created_at, '%Y') AS year_num FROM orders WHERE MONTH(created_at) GROUP BY year_num, month_name ASC"

        const [result] = await conn.execute(queryCommand)

        if(result) return result
    } catch (error) {
       console.error("Error fetching monthly sales (model)", error)
    }
}


export const getYearlySales = async () =>{
    try {
        const queryCommand = "SELECT SUM(amount) AS sales, SUM(qty) AS qty, YEAR(created_at) AS year_num FROM orders WHERE YEAR(created_at)GROUP BY  YEAR(created_at)"

        const [result] = await conn.execute(queryCommand)

        if(result) return result
    } catch (error) {
       console.error("Error fetching yearly sales (model)", error)
    }
}


export const getOverallSales = async () =>{
    try {
        const queryCommand = "SELECT SUM(amount) AS sales FROM `orders`"

        const [result] = await conn.execute(queryCommand)

        if(result) return result
    } catch (error) {
       console.error("Error fetching yearly sales (model)", error)
    }
}