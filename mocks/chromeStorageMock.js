const {
  KEY_VALUE,
  ON_CHANGE_LISTENER_NAMESPACE,
  BYTES_IN_USE
} = require('./mockConstants')
const { delay } = require('../__tests__/utils')
//Runtime global variable
chrome = {
  runtime: {}
}

const storageAreafactory = () => ({
  get: (keys, cb) => delay(cb, KEY_VALUE),
  set: (keys, cb) => delay(cb),
  getBytesInUse: (keys, cb) => delay(cb, BYTES_IN_USE),
  remove: (keys, cb) => delay(cb),
  clear: cb => delay(cb)
})

const storageArea = {
  sync: storageAreafactory(),
  local: storageAreafactory(),
  managed: storageAreafactory(),
  onChanged: {
    addListener: cb => delay(cb, KEY_VALUE, ON_CHANGE_LISTENER_NAMESPACE)
  }
}

module.exports = { storageArea }
