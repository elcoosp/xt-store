const store = require('../src/storeFactory').default
const { RUNTIME_ERROR } = require('../mocks/mockConstants')

describe('Store failure', () => {
  beforeEach(() => require('../mocks/chromeStorageFailureMock'))

  afterEach(() =>
    delete require.cache[require.resolve('../mocks/chromeStorageFailureMock')])

  test('store.get/remove/clear/getBytesInUse', () => {
    ;['get', 'remove', 'clear', 'getBytesInUse', 'set'].forEach(method => {
      expect(store('sync')[method]('data')).rejects.toBe(RUNTIME_ERROR)
      expect(store('local')[method]('data')).rejects.toBe(RUNTIME_ERROR)
    })
  })
})
