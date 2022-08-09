import { MetaTags } from '@redwoodjs/web'

import TaskStatsCell from 'src/components/TaskStatsCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <TaskStatsCell />
    </>
  )
}

export default HomePage
