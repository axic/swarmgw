const request = require('request')

function isValidHash (hash) {
  return /^[0-9a-f]{64}$/.test(hash)
}

function getFile (gateway, url, cb) {
  request(gateway + '/' + url, function (error, response, body) {
    if (error) {
      cb(error)
    } else if (response.statusCode !== 200) {
      cb(body)
    } else {
      cb(null, body)
    }
  })
}

function putFile (gateway, content, cb) {
  request({
    method: 'POST',
    uri: gateway + '/bzz-raw:/',
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

module.exports = function (opts) {
  opts = opts || {}
  var gateway
  if (opts.gateway) {
    gateway = opts.gateway
  } else if (opts.mode === 'http') {
    gateway = 'http://swarm-gateways.net'
  } else {
    gateway = 'https://swarm-gateways.net'
  }
  return {
    get: function (url, cb) {
      return getFile(gateway, url, cb)
    },
    put: function (content, cb) {
      return putFile(gateway, content, cb)
    }
  }
}
