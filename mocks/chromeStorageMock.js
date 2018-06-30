const {
  KEY_VALUE,
  ON_CHANGE_LISTENER_NAMESPACE,
  BYTES_IN_USE
} = require('./mockConstants')

const { delay } = require('../mocks/utils')

const storageAreaFactory = () => ({
  get: (keys, cb) => delay(cb, KEY_VALUE),
  set: (keys, cb) => delay(cb),
  getBytesInUse: (keys, cb) => delay(cb, BYTES_IN_USE),
  remove: (keys, cb) => delay(cb),
  clear: cb => delay(cb, undefined)
})

const storageArea = {
  sync: storageAreaFactory(),
  local: storageAreaFactory(),
  managed: storageAreaFactory(),
  onChanged: {
    addListener: cb => delay(cb, KEY_VALUE, ON_CHANGE_LISTENER_NAMESPACE)
  }
}

//Runtime global variable
chrome = {
  runtime: {},
  storage: storageArea
}
