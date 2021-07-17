import React,{FC,ReactNode,ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react';
import classNames from 'classnames'

// 1.定义button按钮的类型和button按钮的大小 
type ButtonSize = 'lg' | 'sm';
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

// 2.定义button组件所需要的参数
interface BaseButtonProps {
    classnames?: string;
    /** 设置Button的尺寸 */
    size?: ButtonSize;
    /** 设置Button的类型 */
    btnType?: ButtonType;
    /** 设置Button是否被禁用 */
    disabled?: boolean;
    href?: string;
    children?: ReactNode;
}

// 8.定义button上的属性和a链接上的属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是我们的第一个 Button 组件
 *  ## Button header
 *  ~~~js
 * import { Button } from 'componetship' 
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    // 3.从props中取出我们需要的参数
    const { classnames, size, btnType, disabled, href, children, ...restProps } = props;

    // 4.定义button组件需要的样式
    const classes = classNames('btn', classnames, {
        ['btn-' + size]: size,
        [`btn-${btnType}`]: btnType,
        disabled: btnType === 'link' && disabled
    })

    // 5.返回我们需要的Button组件
    if (btnType === 'link' && href) {
        return <a className={classes} href={href} {...restProps}>{children}</a>
    } else {
        return <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    }
}

// 6.定义Button组件的默认参数
Button.defaultProps = {
    btnType: 'default',
    children: '我是按钮'
}

// 7.向外暴露出Button组件
export default Button;