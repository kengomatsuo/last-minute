import React, { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'

const History = () => {
  const { navBarHeight } = useContext(ScreenContext)
  return <div style={{ paddingTop: navBarHeight }}>History</div>
}

export default History
