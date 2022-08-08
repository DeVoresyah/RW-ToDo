import NewTask from 'src/components/Task/NewTask'

const NewTaskPage = () => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Add New Task
        </h2>
      </div>

      <NewTask />
    </>
  )
}

export default NewTaskPage
