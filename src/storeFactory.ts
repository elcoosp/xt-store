type StoreType = 'sync' | 'local'
const storeFactory = (type: StoreType) => {
  const CHROME_STORE: chrome.storage.StorageArea = chrome.storage[type]

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
  const self = {
    get,
    getBytesInUse,
    clear,
    set,
    remove
  }
  return self
}

export default storeFactory

// const db = {},
//   S = chrome.storage.sync

// db.set = o =>
//   new Promise((resolve, reject) =>
//     S.set(
//       o,
//       () =>
//         chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(o)
//     )
//   )

// db.get = key =>
//   new Promise((resolve, reject) =>
//     S.get(
//       key,
//       o =>
//         chrome.runtime.lastError
//           ? reject(chrome.runtime.lastError)
//           : resolve(o[key])
//     )
//   )

// db.update = (updater, predicate = _ => true) => key => data =>
//   new Promise((resolve, reject) =>
//     db
//       .get(key)
//       .then(
//         prevData =>
//           predicate(prevData)
//             ? db.set({ [key]: updater(prevData, data) }).then(resolve)
//             : resolve(prevData)
//       )
//       .catch(reject)
//   )

// const concat = (prevData, data) => (prevData ? prevData : []).concat(data)

// db.push = db.update(concat)
// db.pushIf = p => db.update(concat, p)
