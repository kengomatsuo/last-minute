import React, { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import CustomCard from '../components/CustomCard'


const Booking = () => {
  const { navBarHeight} = useContext(ScreenContext)
  return (
    <div className='flex flex-col flex-1 items-center' style={{ paddingTop: navBarHeight }}>
      <CustomCard header={<>This is a Header</>}>Content</CustomCard>
    </div>
  )
}

export default Booking
