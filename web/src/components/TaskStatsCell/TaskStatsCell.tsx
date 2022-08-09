import {
  ClipboardListIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon,
} from '@heroicons/react/outline'
import type { DashboardStatsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query DashboardStatsQuery {
    dashboardStats {
      totalTask
      totalTaskComplete
      totalTaskIncomplete
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  dashboardStats,
}: CellSuccessProps<DashboardStatsQuery>) => {
  console.log('stats =>', dashboardStats)
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3">
      <div className="flex justify-between rounded-lg bg-blue-500 p-5">
        <div className="flex flex-col">
          <span className="text=xs font-medium text-blue-100">Total Task</span>
          <span className="text-3xl font-semibold text-white">
            {dashboardStats.totalTask}
          </span>
        </div>

        <ClipboardListIcon
          className="h-12 w-12 text-white text-opacity-75"
          aria-hidden
        />
      </div>

      <div className="flex justify-between rounded-lg bg-yellow-500 p-5">
        <div className="flex flex-col">
          <span className="text=xs font-medium text-yellow-100">
            Total Task Incomplete
          </span>
          <span className="text-3xl font-semibold text-white">
            {dashboardStats.totalTaskIncomplete}
          </span>
        </div>

        <ClipboardCopyIcon
          className="h-12 w-12 text-white text-opacity-75"
          aria-hidden
        />
      </div>

      <div className="flex justify-between rounded-lg bg-green-500 p-5">
        <div className="flex flex-col">
          <span className="text=xs font-medium text-green-100">
            Total Task Complete
          </span>
          <span className="text-3xl font-semibold text-white">
            {dashboardStats.totalTaskComplete}
          </span>
        </div>

        <ClipboardCheckIcon
          className="h-12 w-12 text-white text-opacity-75"
          aria-hidden
        />
      </div>
    </div>
  )
}
