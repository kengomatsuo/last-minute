import { use, useRef } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { CustomCard, CustomButton, CustomInput } from '../components'
import ScheduleIcon from '../assets/icons/calendar-clock.svg?react'

const Booking = () => {
  const { isSmallScreen } = use(ScreenContext)
  const formRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
  }

  return (
    <div
      className='flex flex-col w-full items-center justify-center'
      // style={{ paddingTop: navBarHeight }}
    >
      <CustomCard
        header='Find a Tutor'
        className={`${isSmallScreen ? 'w-11/12' : 'w-xl'} min-w-1/2 max-w-full`}
      >
        <div className='gap-2'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-1 flex-col gap-2'
            tabIndex='0'
            ref={formRef}
          >
            <CustomInput
              name='Subject / Material'
              type='password'
              placeholder='Biology, Algebra, etc.'
              validateFunction={e => {
                if (e) throw new Error('Subject is error')
              }}
              required
            />
            <CustomInput
              multiline
              name='Details'
              placeholder='I need help with this particular subject...'
              rows={5}
            />
            <div className='flex gap-1'>
              <CustomButton
                className={isSmallScreen ? '' : 'flex-1'}
                type='submit'
              >
                {isSmallScreen ? (
                  <ScheduleIcon
                  width={24}
                  height={24}
                  className='fill-primary'
                />
                ) : (
                  'Schedule'
                )}
              </CustomButton>
              <CustomButton className='flex-1' type='submit' filled>
                Book Now
              </CustomButton>
            </div>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
