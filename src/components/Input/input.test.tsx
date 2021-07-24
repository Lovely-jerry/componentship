import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Input, { InputProps } from './input';

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test Input component', () => {
    it('should render the correct default Input', () => {
        const wapper = render(<Input {...defaultProps} />)
        const testNode = wapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('viking-input-inner')
        fireEvent.change(testNode, { target: { value: '23' } })
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    });
    it('should render the disabled Input on disabled property', () => {
        const wapper = render(<Input {...defaultProps} disabled />)
        const testNode = wapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    });
    it('should render different input sizes on size property', () => {
        const wapper = render(<Input size='lg' placeholder='large input' />)
        const testContainer = wapper.container.querySelector('.viking-input-wrapper')
        expect(testContainer).toHaveClass('input-size-lg')
    });
    it('should render prepand and append element on prepand/append property', () => {
        const { container, getByText } = render(<Input placeholder='pend' prepand='https://' append='.com' />)
        const testContainer = container.querySelector('.viking-input-wrapper')
        expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
        const prepandText = getByText('https://')
        const appendText = getByText('.com')
        expect(prepandText).toBeInTheDocument()
        expect(appendText).toBeInTheDocument()
    })
})