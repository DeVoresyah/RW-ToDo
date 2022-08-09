import { useState } from 'react'

import type { GetTaskQuery, Category } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Tasks from 'src/components/Task/Tasks'
import colorTransform from 'src/util/color-util'

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page } }
}

export const QUERY = gql`
  query GetTaskQuery($page: Int) {
    taskPage(page: $page) {
      total
      tasks {
        title
        isComplete
        id
        createdAt
        Category {
          color
          id
          slug
          title
        }
      }
    }
    categories {
      title
      slug
      id
      color
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  taskPage,
  categories,
}: CellSuccessProps<GetTaskQuery>) => {
  const [categorySelected, setCategorySelected] =
    useState<Partial<Category> | null>(null)

  return (
    <div className="grid grid-cols-5 gap-3">
      <div>
        <h3 className="mb-5 text-2xl font-semibold text-gray-900">Category</h3>
        <ul>
          <li>
            <button
              className={`mb-3 rounded-lg border border-gray-900 bg-gray-900 bg-opacity-10 py-2 px-4 text-sm font-medium text-gray-900 ${
                categorySelected === null && 'bg-opacity-100 text-white'
              }`}
              onClick={() => setCategorySelected(null)}
            >
              All
            </button>
          </li>
          {categories.map((category, categoryIdx) => (
            <li key={categoryIdx}>
              <button
                className={
                  'mb-3 rounded-lg border py-2 px-4 text-sm font-medium'
                }
                onClick={() => setCategorySelected(category)}
                style={{
                  borderColor: category.color,
                  backgroundColor:
                    categorySelected?.id !== category.id
                      ? colorTransform(category.color).replace(
                          '--osmi-opacity',
                          '0.1'
                        )
                      : category.color,
                  color:
                    categorySelected?.id !== category.id
                      ? category.color
                      : 'white',
                }}
              >
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-4">
        <Tasks tasks={taskPage.tasks} />
      </div>
      {/* <Pagination total={taskPage.total} /> */}
    </div>
  )
}
