import type { FindCategories } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Categories from 'src/components/Category/Categories'

export const QUERY = gql`
  query FindCategories {
    categories {
      id
      title
      slug
      color
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center font-sans text-lg font-semibold text-gray-900">
      You don&apos;t have any category yet, try add new one.
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="font-sans text-sm font-medium text-red-500">
    {error.message}
  </div>
)

export const Success = ({ categories }: CellSuccessProps<FindCategories>) => {
  return <Categories categories={categories} />
}
