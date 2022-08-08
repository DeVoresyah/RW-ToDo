import { render } from '@redwoodjs/testing/web'

import InputCheckbox from './InputCheckbox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InputCheckbox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InputCheckbox />)
    }).not.toThrow()
  })
})
