const request = require('request')

function isValidHash (hash) {
  return /^[0-9a-f]{64}$/.test(hash)
}

function getFile (url, cb) {
  request('http://swarm-gateways.net/' + url, function (error, response, body) {
    if (error) {
      cb(error)
    } else if (response.statusCode !== 200) {
      cb(body)
    } else {
      cb(null, body)
    }
  })
}

function putFile (content, cb) {
  request({
    method: 'POST',
    uri: 'http://swarm-gateways.net/bzzr:/',
    body: content
  }, function (error, response, body) {
    if (error) {
      cb(error)
    } else if (response.statusCode !== 200) {
      cb(body)
    } else if (!isValidHash(body)) {
      cb('Invalid hash')
    } else {
      cb(null, body)
    }
  })
}

module.exports = {
  get: getFile,
  put: putFile
}
