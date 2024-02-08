const jwt = require('jsonwebtoken')

module.exports = (id,fio,role) => {
    return (
        jwt.sign({
            id:id,
            fio:fio,
            role:role
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'24h'
        })
    )
}