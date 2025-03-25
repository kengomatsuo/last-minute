import { use, useRef } from 'react'
import { CustomCard, CustomButton, CustomInput } from '../components'
import { CourseContext } from '../contexts/CourseContext'

const Booking = () => {
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
            <CustomButton
              disabled={isRequestPending}
              className='mt-4'
              filled
              type='submit'
            >
              Find Tutors
            </CustomButton>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Booking
