import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames'
import Icon from '../Icon/icon';

type inputSize = 'lg' | 'sm'

library.add(fas);

// 1.定义Input组件接口需要的字段类型
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /*** Input组件的大小 */
    size?: inputSize;
    /*** Input组件是否被禁用 */
    disabled?: boolean;
    /*** Input组件是否有图标 */
    icon?: IconProp;
    /*** Input组件是否有前缀 */
    prepand?: string | ReactElement;
    /*** Input组件是否有后缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// 2.定义Input组件
export const Input: FC<InputProps> = (props) => {
    // 2.1解构出需要的参数
    const { size, disabled, icon, prepand, append, children, ...restProps } = props;

    // 2.2根据属性定义对应的样式
    const classes = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepand
    })

    // 3.2 如果受控组件的value值未进行设置时，我们给他定义成空字符串
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    // 3.1 如何使用了value和defaultValue,就删除defaultValue
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value)
    }
    return (<div className={classes}>
        {prepand && <div className='viking-input-group-prepand'>{prepand}</div>}
        {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`} /></div>}
        <input className='viking-input-inner' disabled={disabled} {...restProps} />
        {append && <div className='viking-input-group-append'>{append}</div>}
    </div>)
}


export default Input;