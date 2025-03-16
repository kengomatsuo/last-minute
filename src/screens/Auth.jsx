import { useState } from 'react'

const Auth = () => {
  const [action, setAction] = useState(location.state?.action || "login");

  return (
    <div>
      Login
    </div>
  )
}

export default Auth
