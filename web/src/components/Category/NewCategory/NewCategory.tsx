import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CategoryForm from 'src/components/Category/CategoryForm'

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
    }
  }
`

const NewCategory = () => {
  const [createCategory, { loading, error }] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Category created')
        navigate(routes.categories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCategory({
      variables: {
        input: {
          ...input,
          slug: input.title
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
        },
      },
    })
  }

  return <CategoryForm onSave={onSave} loading={loading} error={error} />
}

export default NewCategory
