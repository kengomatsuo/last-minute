import { use, useRef } from 'react'
import { CustomCard, CustomButton, CustomInput } from '../components'
import { CourseContext } from '../contexts/CourseContext'
import { ScreenContext } from '../contexts/ScreenContext'
import CalendarIcon from '../assets/icons/calendar-clock.svg?react'
import { useConsoleLog, useLocalStorage } from '../hooks'

const Booking = () => {
  const { isSmallScreen } = use(ScreenContext)
  const { requestCourse, isRequestPending } = use(CourseContext)
  const [isInstantBooking, setIsInstantBooking] = useLocalStorage(
    'BookingDraft_Instant',
    true
  )
  const formRef = useRef(null)
  const topicRef = useRef(null)
  const subjectRef = useRef(null)
  const detailsRef = useRef(null)
  const dateTimeRef = useRef(null)
  useConsoleLog('isInstantBooking', isInstantBooking)

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

    if (dateTimeRef.current) {
      isValid = (await dateTimeRef.current.validate()) && isValid
    }

    if (!isValid) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    console.log('Submitting:', data)
    try {
      await requestCourse(data)
      topicRef.current.reset()
      subjectRef.current.reset()
      detailsRef.current.reset()
      dateTimeRef.current.reset()
      setIsInstantBooking(true)
    } catch (error) {
      alert(`Error requesting course: ${error.message}`)
    }
  }

  const handleScheduleBooking = async () => {
    let isValid = true
    isValid = (await topicRef.current.validate()) && isValid
    isValid = (await subjectRef.current.validate()) && isValid
    isValid = (await detailsRef.current.validate()) && isValid

    if (!isValid) return
    setIsInstantBooking(false)
  }

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <CustomCard
        header={isInstantBooking ? 'Instant Booking' : 'Schedule Booking'}
        className='w-[min(48rem,11/12*100%)] p-[min(3rem,4%)]'
      >
        <div className='gap-2 '>
          <form
            onSubmit={handleSubmit}
            className='focus:!ring-0'
            tabIndex='0'
            ref={formRef}
          >
            {isInstantBooking ? (
              <div className='flex flex-1 flex-col gap-2'>
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
                    onClick={() => handleScheduleBooking()}
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
              </div>
            ) : (
              <div className='flex flex-1 flex-col gap-2'>
                <CustomInput
                  ref={topicRef}
                  name='topic'
                  type='display'
                  autoSave='BookingDraft_Topic'
                />
                <CustomInput
                  ref={subjectRef}
                  name='subject'
                  type='display'
                  options={subjectOptions}
                  autoSave='BookingDraft_Subject'
                />
                <CustomInput
                  ref={detailsRef}
                  name='details'
                  multiline={5}
                  type='display'
                  autoSave='BookingDraft_Details'
                  className='text-ellipsis'
                />
                <CustomInput
                  ref={dateTimeRef}
                  // min format: 'YYYY-MM-DDTHH:MM'
                  // max format: 'YYYY-MM-DDTHH:MM'
                  min={new Date().toISOString().slice(0, 16)}
                  max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 16)}
                  step={900}
                  // validate function, throw error if invalid
                  validateFunction={value => {
                    console.log('Checking', value)
                    if (new Date(value) < Date.now())
                      throw new Error('Date and time must be in the future')
                    if (new Date(value) > Date.now() + 14 * 24 * 60 * 60 * 1000)
                      throw new Error(
                        'Date and time must be within the next 14 days'
                      )
                  }}
                  name='bookingTime'
                  label='Date and Time'
                  type='datetime-local'
                  disabled={isRequestPending}
                  required
                  autoSave='BookingDraft_DateTime'
                  className='flex-1'
                />
                <CustomButton type='submit' filled>
                  Book
                </CustomButton>
              </div>
            )}
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
