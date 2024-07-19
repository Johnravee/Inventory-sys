import { getMonthlySales, getOverallSales, getWeeklySales, getYearlySales } from "../models/salesModel.js"


export const retrieveWeeklySales = async (req, res) =>{
    try {
        const result = await getWeeklySales()

        if(!result) return res.status(400).json({error: "Error fetching data"})
        console.log(result);
        return res.status(200).json(result)
        
    } catch (error) {
        console.error("Error fetching weekly sales (controller)", error)
    }
}


export const retrieveMonthlySales = async (req, res) =>{
    try {
        const result = await getMonthlySales()

        if(!result) return res.status(400).json({error: "Error fetching data"})
        
        return res.status(200).json(result)
        
    } catch (error) {
        console.error("Error fetching monthly sales (controller)", error)
    }
}

export const retrieveYearlySales = async (req, res) =>{
    try {
        const result = await getYearlySales()

        if(!result) return res.status(400).json({error: "Error fetching data"})
        
       
        return res.status(200).json(result)
        
    } catch (error) {
        console.error("Error fetching yearly sales (controller)", error)
    }
}

export const retrieveOverallSales = async (req, res) =>{
    try {
        const result = await getOverallSales()

        if(!result) return res.status(400).json({error: "Error fetching data"})
        console.log(result);
        return res.status(200).json(result)
        
    } catch (error) {
        console.error("Error fetching overall sales (controller)", error)
    }
}