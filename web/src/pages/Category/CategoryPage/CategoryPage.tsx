import CategoryCell from 'src/components/Category/CategoryCell'

type CategoryPageProps = {
  id: string
}

const CategoryPage = ({ id }: CategoryPageProps) => {
  return <CategoryCell id={id} />
}

export default CategoryPage
