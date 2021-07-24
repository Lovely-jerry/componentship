import React, { useState } from 'react'
import Input from './input'
import { storiesOf } from "@storybook/react";

const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} defaultValue={value}
        onChange={(e) => { setValue(e.target.value) }}
    />
}

const defaultInput = () => (
    <>
        <Input />
        <ControlledInput />
    </>
)
const sizeIsInput = () => (
    <>
        <Input size='sm' />
        <Input size='lg' />
    </>
)

const disabledInput = () => (
    <Input disabled />
)

const iconInput = () => (
    <Input icon='coffee' />
)

const pandInput = () => (
    <>
        <Input prepand='https//' />
        <Input append='.com' />
    </>
)


storiesOf('Input Component', module)
    .add('基本样式Input', defaultInput)
    .add('被禁用的input', disabledInput)
    .add('不同size的Input', sizeIsInput)
    .add('带图标的input', iconInput)
    .add('带前后缀的input', pandInput)