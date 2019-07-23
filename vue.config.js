const fs = require('fs');

module.exports = {
    publicPath: './',
    devServer: {
      https: {
        key: fs.readFileSync('../../../ssl/localhost.key'),
        cert: fs.readFileSync('../../../ssl/localhost.crt'),
        ca: fs.readFileSync('../../../ssl/myCA.pem'),
      }
    }
  }