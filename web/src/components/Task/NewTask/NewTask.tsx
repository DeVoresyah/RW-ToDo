import type { FindCategories } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const GET_CATEGORIES_QUERY = gql`
  query FindCategories {
    categories {
      id
      title
      slug
      color
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

const NewTask = () => {
  const { data } = useQuery<FindCategories>(GET_CATEGORIES_QUERY)
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task created')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const dataToSend = {
      title: input.title,
      categoryId: input.category.id,
      isComplete: input.isComplete,
    }

    createTask({
      variables: { input: dataToSend },
    })
  }

  console.log('data categories =>', data?.categories)

  return (
    <TaskForm
      onSave={onSave}
      loading={loading}
      error={error}
      categories={data?.categories ?? []}
    />
  )
}

export default NewTask
