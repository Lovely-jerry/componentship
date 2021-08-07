import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'
import { UploadProps, Upload } from './upload'

jest.mock('../Icon/icon', () => {
    return ({ icon, onClick }) => <span onClick={onClick}>{icon}</span>
})
jest.mock('axios')
// 定义axios的 mock 对象
const mockedAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    darg: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
// 要上传的文件
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    })
    it('upload process should works fine', async () => {
        const { queryByText } = wrapper
        // 方式一
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ data: 'cool' })
        // })
        // 方式二(仅限于返回一个promise)
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, { target: { files: [testFile] } })
        expect(queryByText('spinner')).toBeInTheDocument()
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(queryByText('check-circle')).toBeInTheDocument()
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)

        // remove the upload file
        expect(queryByText('times')).toBeInTheDocument()
        fireEvent.click(queryByText('times') as HTMLElement)
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })
    it('drag and drop files should works fine', async () => {
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('is-dragover')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('is-dragover')

        const mockDropEvent = createEvent.drop(uploadArea)
        Object.defineProperty(mockDropEvent, "dataTransfer", {
            value: {
                files: [testFile]
            }
        })
        fireEvent(uploadArea, mockDropEvent)
        await waitFor(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    })
})
