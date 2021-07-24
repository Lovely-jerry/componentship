import React, { useState, useEffect } from 'react'

/**
 * 自定义防抖函数
 * @param value 
 * @param delay 
 * @returns 
 */
export default function useDebounce(value: any, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeId = window.setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timeId)
        }
    }, [value, delay])

    return debouncedValue
}