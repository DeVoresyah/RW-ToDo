import { useRef, useState } from 'react'

import { Label, FieldError } from '@redwoodjs/forms'

import { useOutsideAlerter } from 'src/hooks/useOutsideAlerter'

import Dropdown from '../Dropdown/Dropdown'

const InputMultiselect = (props) => {
  const { name, labelText } = props
  const [dropdown, setDropdown] = useState(false)
  const [items] = useState(['john', 'milos', 'steph', 'kathreine'])
  const [selectedItems, setSelected] = useState([])
  const dropdownRef = useRef(null)
  useOutsideAlerter(dropdownRef, () => setDropdown(false))

  const addTag = (item) => {
    setSelected(selectedItems.concat(item))
    setDropdown(false)
  }

  const removeTag = (item) => {
    const filtered = selectedItems.filter((e) => e !== item)
    setSelected(filtered)
  }

  return (
    <>
      <Label name={name} className="mb-1 text-sm font-semibold text-gray-900">
        {labelText}
      </Label>

      <div
        className={`autcomplete-wrapper ${props?.className}`}
        ref={dropdownRef}
      >
        <div className="autcomplete">
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="w-full">
              <div className="relative flex flex-col items-center">
                <div className="w-full">
                  <div className="flex rounded-md bg-gray-100 py-2 px-3">
                    <div className="flex flex-auto flex-wrap">
                      {selectedItems.map((tag, index) => {
                        return (
                          <div
                            key={index}
                            className="mr-1 flex items-center justify-center rounded-full border border-teal-300 bg-teal-100 py-1 px-2 font-medium text-teal-700 "
                          >
                            <div className="max-w-full flex-initial text-xs font-normal leading-none">
                              {tag}
                            </div>
                            <div className="flex flex-auto flex-row-reverse">
                              <button onClick={() => removeTag(tag)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-x ml-2 h-4 w-4 cursor-pointer rounded-full hover:text-teal-400"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                      <div className="flex-1">
                        <input
                          placeholder=""
                          onFocus={() => setDropdown(true)}
                          className="h-full w-full appearance-none bg-transparent text-gray-800 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex">
                {dropdown ? (
                  <Dropdown list={items} addItem={addTag}></Dropdown>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FieldError
        name={props.name}
        className="text-xs font-medium text-red-500"
      />
    </>
  )
}

export default InputMultiselect
