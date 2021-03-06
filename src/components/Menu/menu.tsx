import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type selectedCallBack = (selectedIndex: string) => void

// 1.定义menu组件需要参数的类型
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    styles?: React.CSSProperties;
    onSelect?: selectedCallBack;
    defaultOpenSubMenus?: string[];
}

// 6.定义context(往子元素)中传递值的类型
interface MenuContextProps {
    index: string;
    onSelect?: selectedCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

//8. 定义context上下文
export const MenuContext = createContext<MenuContextProps>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    // 2.从props中去除我们需要的参数
    const { defaultIndex, className, mode, styles, children, onSelect, defaultOpenSubMenus } = props;
    // 10.定义用户选中的哪一项（默认选中第一项）
    const [currentIndex, setActive] = useState(defaultIndex)
    // 3.定义需要的className
    const classes = classNames("viking-menu", className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    //11. 保存用户选中的muenItem和调用onSelect函数
    const handleSelect = (index: string): void => {
        setActive(index);
        onSelect && onSelect(index);
    }

    // 9.定义往子组件传递的值
    const passedContext: MenuContextProps = {
        index: currentIndex ? currentIndex : '0',
        onSelect: handleSelect,
        mode,
        defaultOpenSubMenus
    }

    // 11.判断子组件是否是MenuItem,且将MenuItem中的index改成非传字段
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }

        })
    }

    //4. 返回menu组件
    return (<ul className={classes} style={styles} data-testid='test-menu'>
        <MenuContext.Provider value={passedContext}>
            {/* {children} */}
            {renderChildren()}
        </MenuContext.Provider>

    </ul>)
}

// 5.定义menu的默认参数
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;