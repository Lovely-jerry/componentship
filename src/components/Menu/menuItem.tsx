import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

// 1.定义menuIten需要的参数类型
export interface MenuItemProps {
    index?: number;
    className?: string;
    disabled?: boolean;
    styles?: React.CSSProperties;
}


const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, className, styles, disabled, children } = props;
    // 2.接收来自父组件的值
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-actived': context.index === index
    })
    const handleClick = () => {
        if (context.onSelect && !disabled && index) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={styles} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem;