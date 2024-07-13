import conn from "../connection/conn.js"
import bcrypt from 'bcryptjs'

const errorHandler = (errorMsg) =>{return {err : errorMsg}}

//*authenticate details provided
export const login = async (email, password) =>{
    try {
        const queryCommand = "SELECT * FROM accounts WHERE email = ?"
        const [user] = await conn.execute(queryCommand, [email])

        if(!user.length > 0) {return errorHandler("invalid email")}

        const userId = user[0].id
        const userHashPassword = user[0].password

        const isValid = await bcrypt.compare(password, userHashPassword)
        

        if (!isValid) {return errorHandler("invalid password")}
        else          {return { userId }}
          
    } catch (error) {
        console.error("Error selecting account", error)
        throw error
    }

}

//*create new account
export const signup = async (firstname, lastname, email, password) =>{
    try {
        const genSalt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, genSalt)
        const queryCommand = "INSERT INTO accounts (firstname, lastname, email, password) VALUES(?,?,?,?)"
        const exec = await conn.execute(queryCommand, [firstname, lastname, email, hash])

        if(!exec.length > 0) {return errorHandler("Account creation failed")}  
        else                 {return exec}       
    } catch (error) {
         console.error("Error account registration", error)
    }
}


//! Hindi pa tapos sa recovery
export const recover = async (email, password) =>{
    try {
        return {email, password}
    } catch (error) {
        console.error("Error account recovery", error)
    }
}


export const getUser = async (id) => {
    try {
        const userID = id
        
        const queryCommand = 'SELECT * FROM accounts WHERE id = ?'
        const [result] = await conn.execute(queryCommand, [parseInt(userID)])

        const user = result[0]

        console.log('====================================')
        console.log('Database result :', user) 
        console.log('====================================')

        return user 

    } catch (error) {
        console.error("Error getting the account", error)

    }
}