import TaskCell from 'src/components/Task/TaskCell'

type TaskPageProps = {
  id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
  return <TaskCell id={id} />
}

export default TaskPage
