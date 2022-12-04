import { useEffect, useState } from 'react'

export const useLocalStorage = <T = {}>(key: string, defaultVal: T) => {
  const [value, setValue] = useState(() => {
    const foundValue = localStorage.getItem(key)
    return !!foundValue ? JSON.parse(foundValue) : defaultVal
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}
