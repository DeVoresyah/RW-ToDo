import { render } from '@redwoodjs/testing/web'

import InputMultiselect from './InputMultiselect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InputMultiselect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InputMultiselect />)
    }).not.toThrow()
  })
})
