import { Form, FormError, useForm, Controller, Submit } from '@redwoodjs/forms'

import Input from 'src/components/Input/Input'
import InputCheckbox from 'src/components/InputCheckbox/InputCheckbox'
import InputDropdown from 'src/components/InputDropdown/InputDropdown'

const TaskForm = (props) => {
  const { categories } = props
  const form = useForm()

  const onSubmit = (data) => {
    props.onSave(data, props?.task?.id)
  }

  return (
    <div className="container mt-5 w-full rounded-lg bg-white p-5 shadow-md md:mx-auto md:w-6/12 lg:w-8/12">
      <Form onSubmit={onSubmit} formMethods={form} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Input
          name="title"
          defaultValue={props.task?.title}
          validation={{ required: true }}
          labelText="Task"
          containerClassName="mb-4"
        />

        <Controller
          control={form.control}
          name="category"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputDropdown
              name="category"
              labelText="Category"
              className="mb-4"
              options={categories}
              validation={{ required: true }}
              value={value}
              onBlur={onBlur}
              onSelect={onChange}
            />
          )}
        />

        <InputCheckbox
          name="isComplete"
          labelText="Mark as completed"
          defaultChecked={props.task?.isComplete}
          containerClassName="mb-4"
          validation={{ required: false }}
        />

        <Submit
          disabled={props.loading}
          className={`rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 ${
            props.loading && 'bg-opacity-5'
          }`}
        >
          Save
        </Submit>
      </Form>
    </div>
  )
}

export default TaskForm
