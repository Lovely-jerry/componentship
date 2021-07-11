import React from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

// 1.定义menu的默认样式和事件参数
const testProps: MenuProps = {
    defaultIndex: '0',
    className: 'menu-test',
    onSelect: jest.fn(),
}
// 2.定义垂直menu的样式参数
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
// 3.定义menu菜单组件
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>abcdeF</MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>drop1</MenuItem>
            </SubMenu>
        </Menu>
    )
}
// 6.定义Menu组件测试需要的css文件
const createCssFile = () => {
    const cssFile: string = `
        .viking-submenu{
            display:none;
        }
        .viking-submenu.menu-opened{
            display: block;
        }
    `;
    const cssElement = document.createElement('style');
    cssElement.type = 'text/css';
    cssElement.innerHTML = cssFile;
    return cssElement;
}
// 4.定义测试过程中需要的参数及其类型
let wapper: RenderResult, menuElement: HTMLElement, activedElement: HTMLElement, disabledElement: HTMLElement;
// 5.定义Menu组件的测试用例
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wapper = render(generateMenu(testProps))
        wapper.container.append(createCssFile())
        menuElement = wapper.getByTestId('test-menu')
        activedElement = wapper.getByText('active')
        disabledElement = wapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu menu-test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activedElement).toHaveClass('menu-item is-actived')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const otherMenuItemElement = wapper.getByText('abcdeF')
        fireEvent.click(otherMenuItemElement)
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        expect(otherMenuItemElement).toHaveClass('menu-item is-actived')
        expect(activedElement).not.toHaveClass('is-actived')
        fireEvent.click(disabledElement)
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
        expect(disabledElement).not.toHaveClass('is-actived')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wapper = render(generateMenu(testVerProps))
        const menuElement = wapper.getByTestId('test-menu')
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu menu-vertical')
    })
    test('should show dropdown items when hover on subMenu', async () => {
        expect(wapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wapper.getByText('dropdown');
        fireEvent.mouseEnter(dropdownElement);
        await wait(() => {
            expect(wapper.queryByText('drop1')).toBeVisible()
        })

        fireEvent.click(wapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wapper.queryByText('drop1')).not.toBeVisible()
        })

    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        cleanup()
        const wapper = render(generateMenu(testVerProps))
        wapper.container.append(createCssFile())
        const dropElement = wapper.getByText('drop1');
        expect(dropElement).not.toBeVisible()
        fireEvent.click(wapper.getByText('dropdown'))
        expect(dropElement).toBeVisible()
    })
    it('should show shuMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        cleanup()
        const wapper = render(generateMenu({ ...testVerProps, defaultOpenSubMenus: ['3'] }));
        wapper.container.append(createCssFile());
        const dropdownEl = wapper.getByText('drop1')
        expect(dropdownEl).toBeVisible()
    })
})