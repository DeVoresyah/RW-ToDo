import type { TaskPage } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = `
  query GetTasksQuery($page: Int) {
    tasksPage(page: $page) {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ tasks }: CellSuccessProps<TaskPage>) => {
  return (
    <ul>
      {tasks.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
