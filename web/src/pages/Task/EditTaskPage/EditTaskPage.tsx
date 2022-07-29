import EditTaskCell from 'src/components/Task/EditTaskCell'

type TaskPageProps = {
  id: string
}

const EditTaskPage = ({ id }: TaskPageProps) => {
  return <EditTaskCell id={id} />
}

export default EditTaskPage
