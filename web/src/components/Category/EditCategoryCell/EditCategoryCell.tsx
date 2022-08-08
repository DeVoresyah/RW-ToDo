import type { EditCategoryById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CategoryForm from 'src/components/Category/CategoryForm'

export const QUERY = gql`
  query EditCategoryById($id: String!) {
    category: category(id: $id) {
      id
      title
      slug
      color
      createdAt
    }
  }
`
const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategoryMutation($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      title
      slug
      color
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ category }: CellSuccessProps<EditCategoryById>) => {
  const [updateCategory, { loading, error }] = useMutation(
    UPDATE_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Category updated')
        navigate(routes.categories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCategory({ variables: { id, input } })
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Edit Category &quot;{category.title}&quot;
        </h2>
      </div>

      <div className="rw-segment-main">
        <CategoryForm
          category={category}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </>
  )
}
