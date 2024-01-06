import { useEffect, useState } from "react"

const getTodos = (key: string, initialValue: any) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue) return JSON.parse(savedValue)

    return initialValue
}

const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        return getTodos(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue]
}

export default useLocalStorage