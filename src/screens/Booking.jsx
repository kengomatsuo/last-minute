import { use } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import CustomCard from '../components/CustomCard'
import CustomButton from '../components/CustomButton'

const Booking = () => {
  const { navBarHeight } = use(ScreenContext)
  return (
    <div
      className='flex flex-col flex-1 items-center'
      style={{ paddingTop: navBarHeight }}
    >
      <CustomCard interactive header='This is a Header'>
        <div className='flex flex-col gap-2'>
          <>This is the content</>
          <CustomButton onClick={() => console.log('hey')}>This is a button</CustomButton>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
