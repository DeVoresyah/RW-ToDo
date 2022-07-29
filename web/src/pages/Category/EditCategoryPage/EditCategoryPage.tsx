import EditCategoryCell from 'src/components/Category/EditCategoryCell'

type CategoryPageProps = {
  id: string
}

const EditCategoryPage = ({ id }: CategoryPageProps) => {
  return <EditCategoryCell id={id} />
}

export default EditCategoryPage
