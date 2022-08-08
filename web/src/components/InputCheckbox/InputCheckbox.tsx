import { Label, useRegister, FieldError } from '@redwoodjs/forms'
// Types
import type { CheckboxFieldProps } from '@redwoodjs/forms'

interface InputCheckboxProps extends CheckboxFieldProps {
  containerClassName?: string
  labelText: string
}

const InputCheckbox = (props: InputCheckboxProps) => {
  const { containerClassName, labelText, name, validation } = props

  const register = useRegister({
    name,
    validation,
  })

  return (
    <div className={containerClassName}>
      <div className="flex items-center">
        <input
          {...register}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-100 bg-gray-100 text-blue-500 checked:border-blue-500 checked:bg-blue-500 indeterminate:bg-gray-100 focus:ring-blue-500"
        />

        <Label name={name} className="ml-2 text-sm font-semibold text-gray-900">
          {labelText}
        </Label>
      </div>

      <FieldError
        name={props.name}
        className="text-xs font-medium text-red-500"
      />
    </div>
  )
}

export default InputCheckbox
