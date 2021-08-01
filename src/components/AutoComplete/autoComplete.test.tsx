import React from 'react'
import { render, fireEvent, RenderResult, waitFor, cleanup } from "@testing-library/react";
import { config } from "react-transition-group";
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

//使异步操作变成同步的
config.disabled = true;

// 测试数据
const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]

//定义参数
const testProps: AutoCompleteProps = {
    fetchSuggest: (query) => testArray.filter(item => item.value.includes(query)),
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}
interface dataType {
    value: string;
    number: number;
}
// 定义自定义下拉模板
const renderOption = (item: DataSourceType<dataType>) => (
    <>
        <h3>{item.value}</h3>
        <p>{item.number}</p>
    </>
)
// 定义需要的变量
let wrapper: RenderResult, inputNode: HTMLInputElement;
describe('test  AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(inputNode.value).toBe('ab')
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('should provide keyboard support', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        let firstResult = wrapper.queryByText('ab')
        let secondResult = wrapper.queryByText('abc')
        fireEvent.keyDown(inputNode, { keyCode: 40 })       //40是按向下箭头
        expect(firstResult).toHaveClass('item-highlighted')

        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(secondResult).toHaveClass('item-highlighted')

        fireEvent.keyDown(inputNode, { keyCode: 38 })       //38是按向上箭头
        expect(firstResult).toHaveClass('item-highlighted')

        fireEvent.keyDown(inputNode, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(inputNode.value).toBe('ab')
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('click outside should hide the dropdown', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await waitFor(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('renderOption should generate the right template', async() => {
        cleanup()
        const wrapper = render(<AutoComplete {...testProps} renderOptions={renderOption} />)
        const inputEl = wrapper.getByPlaceholderText('auto-complete')
        fireEvent.change(inputEl,{target:{value:'b'}})
        await waitFor(()=>{
            expect(wrapper.container.getElementsByTagName('h3').length).toEqual(3)
            expect(wrapper.container.getElementsByTagName('h3')[0].innerHTML).toEqual('ab')
        })
    })
    it('async fetchSuggestions should works fine', () => {
        
    })
})