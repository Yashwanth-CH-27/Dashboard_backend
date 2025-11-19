
const isUpdateValid = (req) => {
    const allowedKeys = ["firstName", "lastName", "age", "gender"]
    const flagVal = Object.keys(req.body).every(key => allowedKeys.includes(key) )
    return flagVal
}

module.exports = isUpdateValid