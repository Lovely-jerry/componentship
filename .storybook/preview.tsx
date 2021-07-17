import React from 'react'
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
// 1.引入样式文件
import '../src/styles/index.scss'

// 2.创建样式属性
const styles: React.CSSProperties = {
  padding:'20px 40px'
}

// 3.定义deccorators函数
const centerDecorator=(storyFn:any)=>{
  return <div style={styles}>{storyFn()}</div>
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


// 4.将装饰器函数添加到数组中（全局配置）
export const decorators=[centerDecorator,withInfo]
