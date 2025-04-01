import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { UserContext } from '../contexts/UserContext'
import { useConsoleLog } from '../hooks'
import { ScreenContext } from '../contexts/ScreenContext'

const Settings = () => {
  const { user, addTutor, addAdmin } = useContext(UserContext)
  const { addAlert } = useContext(ScreenContext)
  const [textInput, setTextInput] = useState('')
  useConsoleLog('textInput', textInput)
  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='flex w-screen flex-col px-8 gap-4 items-center justify-center'
    >
      {user?.claims.isAdmin && (
        <>
          <CustomInput
            placeholder='Add email as admin'
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
          <CustomButton onClick={() => addAdmin(textInput)}>
            Add as Admin
          </CustomButton>
          <CustomButton onClick={() => addTutor(textInput)}>
            Add as Tutor
          </CustomButton>
        </>
      )}
      <CustomButton
        onClick={() => addAlert({message: 'heyy'})}>Test Alert</CustomButton>
    </div>
  )
}

export default Settings
