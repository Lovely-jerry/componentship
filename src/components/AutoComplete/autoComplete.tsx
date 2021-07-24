import React, { useState, FC, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Input, InputProps } from "../Input/input"
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

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
    // 定义高亮选中项
    const [highlightIndex, setHighlightIndex] = useState(-1)

    //保存状态（用来区分用户是input输入框中输入值，还是点击下拉选择搜索结果）
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    // 使用防抖函数，防抖函数返回的值
    const debouncedValue = useDebounce(inputValue, 600)

    // 调用自定义hooks，实现点击元素外关闭搜索结果弹窗
    useClickOutside(componentRef,()=>{setSuggestions([])})

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
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
        setHighlightIndex(-1)
    }, [debouncedValue])

    // 3.保存用户输入的值
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    // 4.定义搜索结果下来组件
    const generateDropdown = () => {
        return (<ul>
            {suggestions.map((item, index) => {
                const classes = classNames('suggestion-item', {
                    'item-highlighted': highlightIndex === index
                })
                return (<li key={index} className={classes} onClick={() => handleSelect(item)}>
                    {/* {item} */}
                    {renderTemplate(item)}
                </li>)
            })}
        </ul>)
    }

    //5.定义点击下拉搜索结果函数
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        onSelect && onSelect(item)
        triggerSearch.current = false
    }

    //6.自定义下拉菜单样式
    const renderTemplate = (item: DataSourceType) => {
        return renderOptions ? renderOptions(item) : item.value
    }

    //定义键盘点击事件
    const handlekeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:                // 按下回车键的键值
                suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex])
                break;
            case 38:                // 按下向上键的键值
                highlight(highlightIndex - 1)
                break;
            case 40:                // 按下向下键的键值
                highlight(highlightIndex + 1)
                break;
            case 27:                // 按下esc键的键值
                setSuggestions([])
                break;
            default:
                break;
        }
    }

    // 判断鼠标选中的是个下拉选项的值
    const highlight = (key: number) => {
        let index = key
        if (key < 0) {
            index = 0
        }
        if (key >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    return (<div className='viking-auto-complete' ref={componentRef}>
        <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handlekeyDown}
            {...restProps}
        />
        {loading && <Icon icon='spinner' spin />}
        {/* {suggestions.length > 0 && generateDropdown()} */}
        {Array.isArray(suggestions) && generateDropdown()}
    </div>)
}

export default AutoComplete