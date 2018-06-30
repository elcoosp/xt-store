const store = require('../src/storeFactory').default
const {
  KEY_VALUE,
  ON_CHANGE_LISTENER_NAMESPACE,
  BYTES_IN_USE,
  RUNTIME_ERROR
} = require('../mocks/mockConstants')

describe('Store success', () => {
  beforeEach(() => {
    require('../mocks/chromeStorageMock')
  })

  afterEach(() => {
    delete require.cache[require.resolve('../mocks/chromeStorageMock')]
  })

  test('store.get', async () => {
    const d = await store('sync').get('data')
    const dS = await store('sync').get('data')
    const dL = await store('local').get('data')
    expect(dS).toEqual(KEY_VALUE)
    expect(dL).toEqual(KEY_VALUE)
  })

  test('store.getBytesInUse without arguments', async () => {
    const dS = await store('sync').getBytesInUse()
    const dL = await store('local').getBytesInUse()
    expect(dS).toEqual(BYTES_IN_USE)
    expect(dL).toEqual(BYTES_IN_USE)
  })
  test('store.getBytesInUse', async () => {
    const dS = await store('sync').getBytesInUse()
    const dL = await store('local').getBytesInUse('Some key')
    expect(dS).toEqual(BYTES_IN_USE)
    expect(dL).toEqual(BYTES_IN_USE)
  })
  test('store.clear', async () => {
    const dS = await store('sync').clear()
    const dL = await store('local').clear()
    expect(dS).toEqual(undefined)
    expect(dL).toEqual(undefined)
  })
  test('store.set', async () => {
    const dS = await store('sync').set({ data: 7 })
    const dL = await store('local').set({ data: 7 })
    expect(dS).toEqual({ data: 7 })
    expect(dL).toEqual({ data: 7 })
  })
})
