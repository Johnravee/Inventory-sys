import { login, recover, signup, getUser } from '../models/userModel.js'
import jwt from 'jsonwebtoken'



//*Token generator
const Age = 24 * 60 * 60 * 1000
const createToken = (userId) =>{
return jwt.sign({userId}, 'thisisinventory', {expiresIn : Age,})
}


//*Get http request 
export const loginAuth = async (req, res) =>{
    const { loginEmail, loginPassword } = req.body

    const result = await login(loginEmail, loginPassword)



    if(result.err){
          return res.status(401).json({ error: result.err })
    }

    const token = createToken(result.userId)

    //!Set cookie to browser sa cookie storage 
    res.cookie('c_user', token, {
        httpOnly: false, 
        secure: true, 
        maxAge: Age,
        sameSite: 'strict'
        
    })

    return res.status(202).json({ token: token })
}

//*Get http request
export const sign_up = async (req, res) =>{
    const { firstname, lastname, email, password } = req.body

    const account = await signup(firstname, lastname, email, password)

    if (!account) {
        return res.status(500).json({ error: 'Account creation failed' })
    }


    return res.status(201).json({ message: 'Account created successfully'})
}

//*Get http request
export const recovery = async (req, res) =>{
    const { recoverEmail, recoverPassword } = req.body

    const account = await recover(recoverEmail, recoverPassword)

    console.log('====================================')
    console.log("Recovered accouunt", account)
    console.log('====================================')
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('c_user') 
        return res.status(200).end()
    } catch (error) {
        console.error("Error logging out:", error)
        return res.status(500).json({ error: 'Logout failed' })
    }
}

export const getAccount = async (req, res) => {
    const token = req.body.requestBody.tokenData

    try {
        const decodedToken = jwt.verify(token, 'thisisinventory')
        const userID = decodedToken.userId

      
        const user = await getUser(userID)

        console.log('====================================')
        console.log('User result:', user) 
        console.log('====================================')

        res.status(200).json({ user }) 

    } catch (error) {
        console.error('JWT Token Error:', error)
        res.status(500).json({ error: 'JWT Token verification failed' })
    }
}