import { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'

const Settings = () => {
  const { navBarHeight } = useContext(ScreenContext)
  return <div style={{ paddingTop: navBarHeight }}>settings</div>
}

export default Settings
