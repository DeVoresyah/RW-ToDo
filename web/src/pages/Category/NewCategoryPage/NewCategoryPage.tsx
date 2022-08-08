import NewCategory from 'src/components/Category/NewCategory'

const NewCategoryPage = () => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Add New Category
        </h2>
      </div>

      <NewCategory />
    </>
  )
}

export default NewCategoryPage
