import { useState } from 'react'
import { getItem, setItem } from '../utils/storage'

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = getItem(key)

            return item || initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value

            setStoredValue(valueToStore)

            setItem(key, valueToStore)
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}
