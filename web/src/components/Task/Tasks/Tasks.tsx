import { useState, useMemo } from 'react'

import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Task/TasksCell'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const TOGGLE_COMPLETE_MUTATION = gql`
  mutation ToggleCompleteMutation($id: String!, $isComplete: Boolean) {
    updateTask(id: $id, input: { isComplete: $isComplete }) {
      id
      title
      isComplete
      createdAt
      categoryId
    }
  }
`

const TasksList = ({ tasks }) => {
  const [filters] = useState(['All', 'Complete', 'Incomplete'])
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const [toggleComplete] = useMutation(TOGGLE_COMPLETE_MUTATION, {
    onCompleted: () => {},
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onToggleComplete = (id, isComplete) => {
    toggleComplete({ variables: { id, isComplete } })
  }

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  const filteredTasks = useMemo(() => {
    if (selectedFilter === 'Complete')
      return tasks.filter((task) => task.isComplete)
    if (selectedFilter === 'Incomplete')
      return tasks.filter((task) => !task.isComplete)

    return tasks
  }, [selectedFilter, tasks])

  return (
    <>
      <div className="mb-5 flex items-center">
        {filters.map((filter, filterIdx) => (
          <button
            key={filterIdx}
            className={`mr-2 rounded-full border border-blue-500 py-1 px-3 text-xs font-medium text-blue-500 ${
              filter === selectedFilter && 'bg-blue-500 text-white'
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {filteredTasks.map((task, taskIdx) => (
          <button
            key={taskIdx}
            className={`mb-3 flex h-auto w-full justify-between rounded-lg bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow ${
              task.isComplete && 'line-through'
            }`}
            onClick={() => {
              onToggleComplete(task.id, !task.isComplete)
            }}
          >
            <span>{task.title}</span>

            <div className="flex">
              <button
                className="mr-px"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(routes.editTask({ id: task.id }))
                }}
              >
                <PencilIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </button>
              <button
                className="ml-px"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteClick(task.id)
                }}
              >
                <TrashIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </button>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}

export default TasksList
