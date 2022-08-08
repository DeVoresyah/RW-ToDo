import { Link, routes } from '@redwoodjs/router'

import CategoriesCell from 'src/components/Category/CategoriesCell'

const CategoriesPage = () => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-gray-900">
          Categories
        </h2>

        <Link
          to={routes.newCategory()}
          className="rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        >
          <span className="font-sans text-xl font-semibold">+</span>{' '}
          <span className="font-sans font-medium">Add Category</span>
        </Link>
      </div>

      <CategoriesCell />
    </>
  )
}

export default CategoriesPage
