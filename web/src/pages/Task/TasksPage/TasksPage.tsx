import { Link, routes } from '@redwoodjs/router'

import TasksCell from 'src/components/Task/TasksCell'

const TasksPage = ({ page = 1 }) => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Tasks
        </h2>

        <Link
          to={routes.newTask()}
          className="rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        >
          <span className="font-sans text-xl font-semibold">+</span>{' '}
          <span className="font-sans font-medium">Add Task</span>
        </Link>
      </div>

      <TasksCell page={page} />
    </>
  )
}

export default TasksPage
