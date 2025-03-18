import React, { use } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'

const Dashboard = () => {
  const { navBarHeight } = use(ScreenContext)
  return (
    <div style={{ paddingTop: navBarHeight }}>
      dashboard
    </div>
  )
}

export default Dashboard
