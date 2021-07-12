import React from 'react'
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// 1.定义icon主题颜色的类型
type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
// 2.定义字体图标中需要的参数
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps,
    className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, ...restProps } = props;
    const classes = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })

    return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon