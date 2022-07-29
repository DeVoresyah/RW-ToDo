import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const Category = ({ category }) => {
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
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Category {category.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{category.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{category.title}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{category.slug}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{category.color}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(category.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCategory({ id: category.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(category.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Category
