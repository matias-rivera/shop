import jwt from 'jsonwebtoken'

//create token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

export default generateToken