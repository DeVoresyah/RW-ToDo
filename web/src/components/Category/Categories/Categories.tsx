import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Category/CategoriesCell'
import colorTransform from 'src/util/color-util'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const CategoriesList = ({ categories }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('Category deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete category ' + id + '?')) {
      deleteCategory({ variables: { id } })
    }
  }

  return (
    <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((category, index) => (
        <button
          key={index}
          className="flex flex-col rounded-lg border p-5"
          style={{
            backgroundColor: colorTransform(category.color).replace(
              '--osmi-opacity',
              '0.1'
            ),
            borderColor: category.color,
          }}
          onClick={() => navigate(routes.category({ id: category.id }))}
        >
          <span style={{ color: category.color }}>{category.title}</span>

          <div className="mt-3 flex text-sm text-white">
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(routes.editCategory({ id: category.id }))
              }}
              title={'Edit category ' + category.id}
              className="mr-1 rounded bg-blue-500 py-1 px-3 text-sm hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              type="button"
              title={'Delete category ' + category.id}
              className="ml-1 rounded bg-red-500 py-1 px-3 hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteClick(category.id)
              }}
            >
              Delete
            </button>
          </div>
        </button>
      ))}
    </div>
  )
}

export default CategoriesList
