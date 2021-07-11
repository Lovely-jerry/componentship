import React from 'react'
import { render, fireEvent, RenderResult,cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

// 1.定义menu的默认样式和事件参数
const testProps: MenuProps = {
    defaultIndex: 0,
    className: 'menu-test',
    onSelect: jest.fn(),
}
// 2.定义垂直menu的样式参数
const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}
// 3.定义menu菜单组件
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>active</MenuItem>
            <MenuItem index={1} disabled>disabled</MenuItem>
            <MenuItem index={2}>abcdeF</MenuItem>
        </Menu>
    )
}
// 4.定义测试过程中需要的参数及其类型
let wapper: RenderResult, menuElement: HTMLElement, activedElement: HTMLElement, disabledElement: HTMLElement;
// 5.定义Menu组件的测试用例
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wapper = render(generateMenu(testProps))
        menuElement = wapper.getByTestId('test-menu')
        activedElement = wapper.getByText('active')
        disabledElement = wapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu menu-test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activedElement).toHaveClass('menu-item is-actived')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const otherMenuItemElement=wapper.getByText('abcdeF')
        fireEvent.click(otherMenuItemElement)
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        expect(otherMenuItemElement).toHaveClass('menu-item is-actived')
        expect(activedElement).not.toHaveClass('is-actived')
        fireEvent.click(disabledElement)
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
        expect(disabledElement).not.toHaveClass('is-actived')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wapper=render(generateMenu(testVerProps))
        const menuElement=wapper.getByTestId('test-menu')
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu menu-vertical')
    })
})