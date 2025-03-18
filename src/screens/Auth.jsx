import { use, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { UserContext } from '../contexts/UserContext'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = use(UserContext)

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || 'signin')

  const handleSignin = async () => {
    await signIn({ email: 'admin@admin.com', password: 'admin123' }).then(
      () => {
        navigate('/')
      }
    )
  }

  const handleSignup = async () => {
    await signUp({ username: '', email: '', password: '' }).then(() => {
      navigate('/')
    })
  }

  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      {/* Semangt je :D */}
      auth
      <CustomButton onClick={() => handleSignin()}>Login</CustomButton>
    </div>
  )
}

export default Auth
