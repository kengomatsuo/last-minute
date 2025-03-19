import { use } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'

const MainLoading = () => {
  const { isOnline } = use(ScreenContext)

  return <div>{isOnline ? 'Loading...' : 'You are offline'}</div>
}

export default MainLoading
