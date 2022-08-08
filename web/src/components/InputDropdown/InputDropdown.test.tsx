import { render } from '@redwoodjs/testing/web'

import InputDropdown from './InputDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InputDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InputDropdown />)
    }).not.toThrow()
  })
})
