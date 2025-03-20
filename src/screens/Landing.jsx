import ket from '../assets/ket.png'
import { CustomButton, CustomFooter, FAQComponent } from '../components'
import { navBarHeight } from '../constants/visualConstants'

const Landing = () => {
  return (
    <div
      className='flex flex-col flex-1 items-center w-screen justify-center'
      style={{ paddingTop: navBarHeight }}
    >
      {/* Clear everything between these comments to start fresh */}
      <div className='flex flex-col items-center justify-center'>
        <img src={ket} width={100} alt='Ket' />
        <h1>Last Minute</h1>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p>Your courses. At your demand.</p>
        <CustomButton onClick={null}>I am a button</CustomButton>
      </div>
      {/* Clear everything between these comments to start fresh */}

      <FAQComponent />
      <CustomFooter />
    </div>
  )
}

export default Landing
