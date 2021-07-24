import React, { useState, FC, ChangeEvent, ReactElement, useEffect } from 'react'
import { Input, InputProps } from "../Input/input"
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'

interface DataSourceObj {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObj

// 1.定义autoComplete组件参数的类型
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggest: (str: string) => DataSourceType[] | Promise<DataSourceObj[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement;
}

//2.定义autoComplete组件
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggest, onSelect, value, renderOptions, ...restProps } = props;

    // 2.1定义input输入框中的值
    const [inputValue, setInputValue] = useState(value as string)
    // 2.2定义搜索下拉框中的值
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    // 显示loading
    const [loading, setLoading] = useState(false)

    // 使用防抖函数，防抖函数返回的值
    const debouncedValue = useDebounce(inputValue, 600)

    useEffect(() => {
        if (debouncedValue) {
            const result = fetchSuggest(debouncedValue)
            if (result instanceof Promise) {
                console.log('triggered');
                setLoading(true)
                result.then((res) => {
                    setSuggestions(res)
                    setLoading(false)
                })
            } else {
                setSuggestions(result)
            }
        } else {
            setSuggestions([])
        }
    }, [debouncedValue])

    // 3.保存用户输入的值
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }

    // 4.定义搜索结果下来组件
    const generateDropdown = () => {
        return (<ul>
            {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)}>
                    {/* {item} */}
                    {renderTemplate(item)}
                </li>
            ))}
        </ul>)
    }

    //5.定义点击下拉搜索结果函数
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        onSelect && onSelect(item)
    }

    //6.自定义下拉菜单样式
    const renderTemplate = (item: DataSourceType) => {
        return renderOptions ? renderOptions(item) : item.value
    }

    return (<div className='viking-auto-complete'>
        <Input
            value={inputValue}
            onChange={handleInputChange}
            {...restProps}
        />
        {loading && <Icon icon='spinner' spin />}
        {/* {suggestions.length > 0 && generateDropdown()} */}
        {Array.isArray(suggestions) && generateDropdown()}
    </div>)
}

export default AutoComplete