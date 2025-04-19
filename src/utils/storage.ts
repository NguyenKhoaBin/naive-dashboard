const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX

interface StorageData<T> {
  value: T
  expire: number | null
}

/**
 * Utility functions for localStorage operations
 */
function createLocalStorage<T extends Storage.Local>() {
  // Default cache expiration is 7 days

  function set<K extends keyof T>(key: K, value: T[K], expire: number = 60 * 60 * 24 * 7) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: new Date().getTime() + expire * 1000, // Calculate expiration timestamp
    }
    const json = JSON.stringify(storageData)
    window.localStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json) // Save data to localStorage
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
    if (!json)
      return null

    const storageData: StorageData<T[K]> | null = JSON.parse(json)

    if (storageData) {
      const { value, expire } = storageData
      if (expire === null || expire >= Date.now()) // Check if the data has expired
        return value
    }
    remove(key) // Remove expired data
    return null
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`) // Remove specific key
  }

  const clear = window.localStorage.clear // Clear all localStorage data

  return {
    set,
    get,
    remove,
    clear,
  }
}

/**
 * Utility functions for sessionStorage operations
 */
function createSessionStorage<T extends Storage.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = JSON.stringify(value)
    window.sessionStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json) // Save data to sessionStorage
  }
  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
    if (!json)
      return null

    const storageData: T[K] | null = JSON.parse(json)

    if (storageData)
      return storageData

    return null
  }
  function remove(key: keyof T) {
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`) // Remove specific key
  }
  const clear = window.sessionStorage.clear // Clear all sessionStorage data

  return {
    set,
    get,
    remove,
    clear,
  }
}

// Export instances for localStorage and sessionStorage
export const local = createLocalStorage()
export const session = createSessionStorage()
