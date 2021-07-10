import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button';

const defaultProps = {
    onClick: jest.fn()
}
const primaryProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    classnames: 'customButton'
}
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}
describe('test Button component', () => {
    it('shoud render the correct default button', () => {
        const wapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wapper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled()
    });
    it('should render the correct component based on different props', () => {
        const wapper = render(<Button {...primaryProps}>Primary</Button>)
        const element = wapper.getByText('Primary');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn btn-primary btn-lg customButton');

    });
    it('should render a link when btnType equals link and href id provided', () => {
        const wapper = render(<Button btnType='link' href='wwww.ccccc'>Link</Button>);
        const element = wapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveAttribute('href');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', () => {
        const wapper = render(<Button {...disabledProps}>disabled</Button>);
        const element=wapper.getByText('disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})