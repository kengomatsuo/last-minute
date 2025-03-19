import { Link } from 'react-router-dom'
import { CustomButton } from '../components'

const Error404 = () => {
  return (
    <div className='flex flex-col flex-1 gap-4 items-center justify-center'>
      <div>
        <h1>404 Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Link to='/'>
        <CustomButton filled>Back to Home</CustomButton>
      </Link>
    </div>
  )
}

export default Error404
