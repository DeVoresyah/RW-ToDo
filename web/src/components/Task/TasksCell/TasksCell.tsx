import type { GetTaskQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Pagination from 'src/components/Pagination/Pagination'
import Tasks from 'src/components/Task/Tasks'

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page } }
}

export const QUERY = gql`
  query GetTaskQuery($page: Int) {
    taskPage(page: $page) {
      total
      tasks {
        title
        isComplete
        id
        createdAt
        Category {
          color
          id
          slug
          title
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ taskPage }: CellSuccessProps<GetTaskQuery>) => {
  return (
    <>
      <Tasks tasks={taskPage.tasks} total={taskPage.total} />
      <Pagination total={taskPage.total} />
    </>
  )
}
