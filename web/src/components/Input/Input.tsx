import { Label, TextField, FieldError } from '@redwoodjs/forms'
// Types
import type { InputFieldProps } from '@redwoodjs/forms'

interface InputProps extends InputFieldProps {
  containerClassName?: string
  labelText: string
}

const Input = (props: InputProps) => {
  const { containerClassName, labelText, name } = props

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <Label name={name} className="mb-1 text-sm font-semibold text-gray-900">
        {labelText}
      </Label>

      <TextField
        {...props}
        className="font-regular rounded-md bg-gray-100 py-2 px-3 text-sm text-gray-900 outline-0"
      />

      <FieldError
        name={props.name}
        className="text-xs font-medium text-red-500"
      />
    </div>
  )
}

export default Input
