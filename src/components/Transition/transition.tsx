import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

//1.定义动画类型
type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left'

// 1.定义TransitionProps的参数类型
interface transition extends CSSTransitionProps {
    animation?: AnimationName;
    className?: string;
    wrapper?: boolean
}

const Transition: React.FC<transition> = (props) => {
    const { animation, children, className, wrapper, ...restProps } = props;

    return <CSSTransition
        classNames={className ? className : animation}
        {...restProps}
    >
        {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
}

Transition.defaultProps = {
    appear: true,
    unmountOnExit: true
}

export default Transition