import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Tasks from 'src/components/Task/Tasks'
import colorTransform from 'src/util/color-util'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const Category = ({ category, tasks }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('Category deleted')
      navigate(routes.categories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete category ' + id + '?')) {
      deleteCategory({ variables: { id } })
    }
  }

  return (
    <>
      <div
        className="mb-10 flex flex-col items-center justify-center rounded-lg border p-5"
        style={{
          borderColor: category.color,
          backgroundColor: colorTransform(category.color).replace(
            '--osmi-opacity',
            '0.1'
          ),
        }}
      >
        <span
          className="font-regular mb-1 text-center text-sm"
          style={{ color: category.color }}
        >
          Category
        </span>
        <h2
          className="mb-10 text-center text-3xl font-semibold"
          style={{ color: category.color }}
        >
          {category.title}
        </h2>

        <div className="flex items-center text-sm text-white">
          <Link
            to={routes.editCategory({ id: category.id })}
            className="mr-1 rounded bg-blue-500 py-1 px-3 text-sm hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            type="button"
            className="ml-1 rounded bg-red-500 py-1 px-3 hover:bg-red-600"
            onClick={() => onDeleteClick(category.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <h3 className="mb-2 text-2xl font-semibold text-gray-900">Tasks</h3>
      <Tasks tasks={tasks} />
    </>
  )
}

export default Category
