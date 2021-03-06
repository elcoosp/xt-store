const { delay } = require('./utils')
const { RUNTIME_ERROR } = require('./mockConstants')

const setErrorAndCall = cb => {
  chrome.runtime.lastError = RUNTIME_ERROR
  cb()
}

const storageAreaFailureFactory = () => ({
  get: (keys, cb) => delay(setErrorAndCall, cb),
  set: (keys, cb) => delay(setErrorAndCall, cb),
  getBytesInUse: (keys, cb) => delay(setErrorAndCall, cb),
  remove: (keys, cb) => delay(setErrorAndCall, cb),
  clear: cb => delay(setErrorAndCall, cb)
})
const storageAreaFailure = {
  sync: storageAreaFailureFactory(),
  local: storageAreaFailureFactory(),
  managed: storageAreaFailureFactory(),
  onChanged: {
    addListener: cb => delay(setErrorAndCall, cb)
  }
}
//Runtime global variable
chrome = {
  runtime: {},
  storage: storageAreaFailure
}
