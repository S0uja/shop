const fs = require('fs')
const staticPath = require('../utils/staticPath')

module.exports = (fileName) => {
    fs.unlinkSync(staticPath(fileName))
}