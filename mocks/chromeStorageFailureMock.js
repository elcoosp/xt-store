const {
  KEY_VALUE,
  ON_CHANGE_LISTENER_NAMESPACE,
  BYTES_IN_USE,
  RUNTIME_ERROR
} = require('./mockConstants')
const { delay } = require('../__tests__/utils')

//Runtime global variable
chrome = {
  runtime: {}
}

const storageAreaFailurefactory = () => ({
  get: (keys, cb) =>
    delay(() => {
      chrome.runtime.lastError = RUNTIME_ERROR
      cb(KEY_VALUE)
    }),
  set: (keys, cb) =>
    delay(() => {
      chrome.runtime.lastError = RUNTIME_ERROR
      cb()
    }),
  getBytesInUse: (keys, cb) =>
    delay(() => {
      chrome.runtime.lastError = RUNTIME_ERROR
      cb(BYTES_IN_USE)
    }),
  remove: (keys, cb) =>
    delay(() => {
      chrome.runtime.lastError = RUNTIME_ERROR
      cb()
    }),
  clear: cb =>
    delay(() => {
      chrome.runtime.lastError = RUNTIME_ERROR
      cb()
    })
})
const storageAreaFailure = {
  sync: storageAreaFailurefactory(),
  local: storageAreaFailurefactory(),
  managed: storageAreaFailurefactory(),
  onChanged: {
    addListener: cb =>
      delay(() => {
        chrome.runtime.lastError = RUNTIME_ERROR
        cb(KEY_VALUE, ON_CHANGE_LISTENER_NAMESPACE)
      })
  }
}

module.exports = { storageAreaFailure }
