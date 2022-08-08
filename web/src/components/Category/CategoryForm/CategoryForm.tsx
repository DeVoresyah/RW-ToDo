import { Form, FormError, Submit } from '@redwoodjs/forms'

import Input from 'src/components/Input/Input'

const CategoryForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.category?.id)
  }

  return (
    <div className="container mt-5 w-full rounded-lg bg-white p-5 shadow-md md:mx-auto md:w-6/12 lg:w-8/12">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Input
          name="title"
          defaultValue={props.category?.title}
          validation={{ required: true }}
          labelText="Name"
          containerClassName="mb-4"
        />

        <Input
          name="color"
          defaultValue={props.category?.color}
          validation={{ required: true }}
          labelText="Category Color"
          containerClassName="mb-4"
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

export default CategoryForm
