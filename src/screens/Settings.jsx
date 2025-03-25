import { use, useState } from 'react'
import { CustomButton, CustomInput } from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { UserContext } from '../contexts/UserContext'
import { useConsoleLog } from '../hooks'

const Settings = () => {
  const { applyTutor, addAdmin } = use(UserContext)
  const [textInput, setTextInput] = useState('')
  useConsoleLog('textInput', textInput)
  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='flex w-screen flex-col px-8 gap-4 items-center justify-center'
    >
      <CustomInput
        placeholder='Add email as admin'
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
      />
      <CustomButton onClick={() => addAdmin(textInput)}>Add as Admin</CustomButton>
      <CustomButton onClick={() => applyTutor(textInput)}>Apply myself for Tutor</CustomButton>
    </div>
  )
}

export default Settings
