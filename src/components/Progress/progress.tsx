import React, { FC } from 'react'
import classNames from 'classnames'

// 定义进度条的主题颜色有哪些类型
type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface ProgressProps {
    // 进度条的数值
    percent: number;
    // 进度条的高度
    strokeHeight?: number;
    // 是否显示文字
    showText?: boolean;
    styles?: React.CSSProperties;
    // 定义进度条的主题颜色
    theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
    const { percent, strokeHeight, showText, styles, theme } = props;

    const progressStyle = classNames('viking-progress-bar-inner', `color-${theme}`)

    return (
        <div className='viking-progress-bar' style={styles}>
            <div className='viking-progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
                <div className={progressStyle} style={{ width: `${percent}%` }}>
                    {showText && <span className='inner-text'>{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

export default Progress;