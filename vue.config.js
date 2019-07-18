const fs = require('fs');

module.exports = {
    devServer: {
      https: {
        key: fs.readFileSync('../../../ssl/localhost.key'),
        cert: fs.readFileSync('../../../ssl/localhost.crt'),
        ca: fs.readFileSync('../../../ssl/myCA.pem'),
      }
    }
  }