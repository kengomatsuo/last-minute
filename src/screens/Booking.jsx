import { use, useRef } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { CustomCard, CustomButton, CustomInput } from '../components'
import ScheduleIcon from '../assets/icons/calendar-clock.svg?react'

const Booking = () => {
  const { isSmallScreen } = use(ScreenContext)
  const formRef = useRef()

  const subjectOptions = [
    { label: 'Math', value: 'math' },
    { label: 'Science', value: 'science' },
    { label: 'English', value: 'english' },
    { label: 'History', value: 'history' },
    { label: 'Computer Science', value: 'computer-science' },
    { label: 'Art', value: 'art' },
    { label: 'Music', value: 'music' },
    { label: 'Physical Education', value: 'physical-education' },
    { label: 'Other', value: 'other' },
  ]

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    alert(JSON.stringify(data))
  }

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <CustomCard
        header='Find a Tutor'
        className={`${isSmallScreen ? 'w-11/12' : 'w-xl'} min-w-1/2 max-w-full`}
      >
        <div className='gap-2 '>
          <form
            onSubmit={handleSubmit}
            className='flex flex-1 flex-col gap-2 focus:!ring-0'
            tabIndex='0'
            ref={formRef}
          >
            <CustomInput
              name='Topic'
              type='text'
              placeholder='Topics, keywords, etc.'
              validateFunction={e => {
                if (e) throw new Error('Subject is error')
              }}
              required
            />
            <CustomInput
              name='Subject'
              type='suggest'
              options={subjectOptions}
              placeholder='Select a subject'
              required
              forceSuggestions
            />
            <CustomInput
              multiline={5}
              name='Details'
              placeholder='I need help with this particular subject...'
            />
            <CustomButton filled>Next</CustomButton>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
