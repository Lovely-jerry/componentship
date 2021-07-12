import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

// 1.定义submenu中props的类型接口
interface SubMenuProps {
    index?: string;
    className?: string;
    title?: string;
}

// 2.定义SubMenu函数
const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { index, className, title, children } = props;
    const context = useContext(MenuContext);
    const isOpenSubMenu = context.defaultOpenSubMenus as Array<String>
    // 9.定义默认展开的subMenu菜单
    const isOpend = (index && context.mode === 'vertical') ? isOpenSubMenu.includes(index) : false
    // 4.定义控制下拉菜单的显示与隐藏变量
    const [menuOpen, setOpen] = useState(isOpend)

    const classes = classNames('menu-item submenu-item', className, {
        'is-actived': context.index === index,
        'is-opend': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    // 5.定义触发下拉菜单显示与隐藏的点击事件
    const hanldeClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    // 6.定义鼠标进入和离开显示或隐藏下拉菜单事件
    let timeId: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timeId)
        e.preventDefault();
        timeId = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }

    // 7.根据Menu组件传递过来的Mode类型控制subMenu菜单显示与隐藏的方式
    const clickEvent = context.mode === 'vertical' ? {
        onClick: hanldeClick
    } : {}

    const mouseEvent = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
    } : {}

    // 3.定义SubMenu中的子元素
    const renderChildren = () => {
        // 6.定义submenu菜单的 样式
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                // return childElement;
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        })
        return (
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames='zoom-in-top'
                appear
                unmountOnExit
            >
                <ul className={subMenuClasses}>{childrenComponent}</ul>
            </CSSTransition>
        )
    }

    return (
        // 8.将定义好的值传递到元素上
        <li className={classes} {...mouseEvent}>
            <div className="submenu-title" {...clickEvent}>
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu;