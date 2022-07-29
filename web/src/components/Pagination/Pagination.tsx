import { Link, routes } from '@redwoodjs/router'

const PER_PAGE = 6

const Pagination = ({ total }) => {
  const items = []

  for (let i = 0; i < Math.ceil(total / PER_PAGE); i++) {
    items.push(
      <li key={i}>
        <Link to={routes.home({ page: i + 1 })}>{i + 1}</Link>
      </li>
    )
  }

  return <ul>{items}</ul>
}

export default Pagination
