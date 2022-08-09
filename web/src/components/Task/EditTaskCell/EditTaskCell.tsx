import type { EditTaskById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

export const QUERY = gql`
  query EditTaskById($id: String!) {
    task: task(id: $id) {
      id
      title
      isComplete
      createdAt
      categoryId
    }
    categories {
      id
      title
      slug
      color
      createdAt
    }
  }
`
const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      isComplete
      createdAt
      categoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  task,
  categories,
}: CellSuccessProps<EditTaskById>) => {
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTask({ variables: { id, input } })
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Edit Task &quot;{task.title}&quot;
        </h2>
      </div>

      <TaskForm
        task={task}
        onSave={onSave}
        error={error}
        loading={loading}
        categories={categories}
      />
    </>
  )
}
