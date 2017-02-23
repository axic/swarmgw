const request = require('request')

function isValidHash (hash) {
  return /^[0-9a-f]{64}$/.test(hash)
}

function getFile (url, cb) {
  request('http://swarm-gateways.net/' + url, function (error, response, body) {
    if (!error & response.statusCode === 200) {
      cb(null, body)
    } else {
      cb(error)
    }
  })
}

function putFile (content, cb) {
  request({
    method: 'POST',
    uri: 'http://swarm-gateways.net/bzzr:/',
    body: content
  }, function (error, response, body) {
    if (!error & response.statusCode === 200) {
      if (!isValidHash(body)) {
        return cb('Invalid hash')
      }

      cb(null, body)
    } else {
      cb(error)
    }
  })
}

module.exports = {
  get: getFile,
  put: putFile
}
