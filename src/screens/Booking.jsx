import { use, useRef } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import {
  CustomCard,
  CustomButton,
  CustomInput,
} from '../components'

const Booking = () => {
  const { navBarHeight } = use(ScreenContext)
  const formRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }

  return (
    <div
      className='flex flex-col flex-1 items-center'
      style={{ paddingTop: navBarHeight }}
    >
      <CustomCard header='Find a Tutor '>
        <div className='gap-2'>
          <>This is the content</>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2' tabIndex="0" ref={formRef}>
            <CustomInput
              name='Name'
              type='text'
              placeholder='Enter your name'
              required
            />
            <CustomInput
              name='Email'
              type='email'
              placeholder='Enter your email'
            />
            <CustomInput
              name='Phone Number'
              type='tel'
              placeholder='Enter your phone number'
            />
            <CustomButton type='submit'>Book Now</CustomButton>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
