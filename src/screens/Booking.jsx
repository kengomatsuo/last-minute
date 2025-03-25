import { use, useRef } from 'react'
import { CustomCard, CustomButton, CustomInput } from '../components'
import { CourseContext } from '../contexts/CourseContext'
import { ScreenContext } from '../contexts/ScreenContext'
import CalendarIcon from '../assets/icons/calendar-clock.svg?react'

const Booking = () => {
  const { isSmallScreen } = use(ScreenContext)
  const { requestCourse, isRequestPending } = use(CourseContext)
  const formRef = useRef()
  const topicRef = useRef()
  const subjectRef = useRef()
  const detailsRef = useRef()

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

  const handleSubmit = async event => {
    event.preventDefault()

    let isValid = true
    isValid = (await topicRef.current.validate()) && isValid
    isValid = (await subjectRef.current.validate()) && isValid
    isValid = (await detailsRef.current.validate()) && isValid

    if (!isValid) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    try {
      await requestCourse(data)
      topicRef.current.reset()
      subjectRef.current.reset()
      detailsRef.current.reset()
    } catch (error) {
      alert(`Error requesting course: ${error.message}`)
    }
  }

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <CustomCard
        header='Find a Tutor'
        className='w-[min(48rem,11/12*100%)] p-[min(3rem,4%)]'
      >
        <div className='gap-2 '>
          <form
            onSubmit={handleSubmit}
            className='flex flex-1 flex-col gap-2 focus:!ring-0'
            tabIndex='0'
            ref={formRef}
          >
            <CustomInput
              ref={topicRef}
              name='topic'
              label='Topic'
              type='text'
              disabled={isRequestPending}
              placeholder='Topics, keywords, etc.'
              required
              autoSave='BookingDraft_Topic'
            />
            <CustomInput
              ref={subjectRef}
              name='subject'
              label='Subject'
              type='suggest'
              disabled={isRequestPending}
              options={subjectOptions}
              placeholder='Select a subject'
              required
              forceSuggestions
              autoSave='BookingDraft_Subject'
            />
            <CustomInput
              ref={detailsRef}
              name='details'
              label='Details'
              multiline={5}
              disabled={isRequestPending}
              placeholder='I need help with this particular question...'
              autoSave='BookingDraft_Details'
            />
            <div className='mt-4 w-full flex gap-2'>
              <CustomButton
                disabled={isRequestPending}
                className={isSmallScreen ? '' : 'flex-1'}
              >
                {isSmallScreen ? (
                  <CalendarIcon width={24} height={24} />
                ) : (
                  'Schedule Booking'
                )}
              </CustomButton>
              <CustomButton
                disabled={isRequestPending}
                className='flex-1'
                filled
                type='submit'
              >
                Instant Booking
              </CustomButton>
            </div>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
