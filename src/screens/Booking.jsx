import { use } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { CustomCard, CustomButton } from '../components'

const Booking = () => {
  const { navBarHeight } = use(ScreenContext)
  return (
    <div
      className='flex flex-col flex-1 items-center'
      style={{ paddingTop: navBarHeight }}
    >
      <CustomCard interactive header='Find a Tutor'>
        <div className='flex flex-col gap-2'>
          <>This is the content</>
          <CustomButton>Book Now</CustomButton>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
