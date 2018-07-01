type StoreType = 'sync' | 'local' | 'managed'
const storeFactory = (storeType: StoreType) => {
  const CHROME_STORE: chrome.storage.StorageArea = chrome.storage[storeType]
  const ifStoreSync = (a: number | string, b?: number | string) =>
    storeType === 'sync' ? a : b

  const get = (keys: string | string[] | Object | null): Promise<Object> =>
    new Promise((resolve, reject) =>
      CHROME_STORE.get(
        keys,
        (data: Object) =>
          chrome.runtime.lastError
            ? reject(chrome.runtime.lastError)
            : resolve(data)
      )
    )

  const getBytesInUse = (
    keys: string | string[] | null = null
  ): Promise<number> =>
    new Promise((resolve, reject) =>
      CHROME_STORE.getBytesInUse(
        keys,
        (bytesInUse: number) =>
          chrome.runtime.lastError
            ? reject(chrome.runtime.lastError)
            : resolve(bytesInUse)
      )
    )

  const clear = (): Promise<undefined> =>
    new Promise((resolve, reject) =>
      CHROME_STORE.clear(
        () =>
          chrome.runtime.lastError
            ? reject(chrome.runtime.lastError)
            : resolve()
      )
    )

  const set = (items: Object): Promise<Object> =>
    new Promise((resolve, reject) =>
      CHROME_STORE.set(
        items,
        () =>
          chrome.runtime.lastError
            ? reject(chrome.runtime.lastError)
            : resolve(items)
      )
    )
  const remove = (keys: string | string[]): Promise<undefined> =>
    new Promise((resolve, reject) =>
      CHROME_STORE.remove(
        keys,
        () =>
          chrome.runtime.lastError
            ? reject(chrome.runtime.lastError)
            : resolve(undefined)
      )
    )

  const update = (updater: (prevData: Object) => Object) => (
    keys: string | string[] | Object | null
  ): Promise<Object> =>
    new Promise((resolve, reject) =>
      get(keys)
        .then(prevData => set(updater(prevData)).then(resolve))
        .catch(reject)
    )

  const self = {
    get,
    getBytesInUse,
    clear,
    update,
    set,
    remove,
    onChange: chrome.storage.onChanged.addListener,
    QUOTA_BYTES: ifStoreSync(102400, 5242880),
    QUOTA_BYTES_PER_ITEM: ifStoreSync(8192),
    MAX_WRITE_OPERATIONS_PER_HOUR: ifStoreSync(1800),
    MAX_WRITE_OPERATIONS_PER_MINUTE: ifStoreSync(120),
    MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: ifStoreSync(1000000),
    MAX_ITEMS: ifStoreSync(512)
  }
  return self
}

export default storeFactory
