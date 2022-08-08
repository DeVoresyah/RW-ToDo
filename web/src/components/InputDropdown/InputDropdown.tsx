import { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { Label, useRegister, FieldError } from '@redwoodjs/forms'

const InputDropdown = (props) => {
  const { className, labelText, name, validation, options, onSelect, value } =
    props

  const register = useRegister({
    name,
    validation,
  })

  return (
    <div className={className}>
      <Label name={name} className="mb-1 text-sm font-semibold text-gray-900">
        {labelText}
      </Label>

      <Listbox {...register} value={value} onChange={onSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-gray-100 py-2 px-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="font-regular block truncate text-sm text-gray-900">
              {value?.title ?? `Select ${labelText}`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-500' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <FieldError
        name={props.name}
        className="text-xs font-medium text-red-500"
      />
    </div>
  )
}

export default InputDropdown
