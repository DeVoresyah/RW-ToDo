import TasksCell from 'src/components/Task/TasksCell'

const TasksPage = ({ page = 1 }) => {
  return <TasksCell page={page} />
}

export default TasksPage
