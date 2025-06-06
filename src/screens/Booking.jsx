import { use, useRef } from 'react'
import {
  CustomCard,
  CustomButton,
  CustomInput,
  CustomInteractive,
} from '../components'
import { CourseContext } from '../contexts/CourseContext'
import { ScreenContext } from '../contexts/ScreenContext'
import CalendarIcon from '../assets/icons/calendar-clock.svg?react'
import ArrowRightIcon from '../assets/icons/arrow-small-right.svg?react'
import { useConsoleLog, useLocalStorage } from '../hooks'
import { useTranslation } from 'react-i18next'

const Booking = () => {
  const { t } = useTranslation()
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
    {
      label:
        t('label.subject') + ' - ' + t('subject.math', { defaultValue: 'Math' }),
      value: 'math',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.science', { defaultValue: 'Science' }),
      value: 'science',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.english', { defaultValue: 'English' }),
      value: 'english',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.history', { defaultValue: 'History' }),
      value: 'history',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.computerScience', { defaultValue: 'Computer Science' }),
      value: 'computer-science',
    },
    {
      label:
        t('label.subject') + ' - ' + t('subject.art', { defaultValue: 'Art' }),
      value: 'art',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.music', { defaultValue: 'Music' }),
      value: 'music',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.physicalEducation', { defaultValue: 'Physical Education' }),
      value: 'physical-education',
    },
    {
      label:
        t('label.subject') +
        ' - ' +
        t('subject.other', { defaultValue: 'Other' }),
      value: 'other',
    },
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
      dateTimeRef.current?.reset()
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
        header={
          isInstantBooking ? (
            t('booking.instantBooking', {
              defaultValue: 'Instant Booking',
            })
          ) : (
            <div className='flex gap-2 items-center'>
              <CustomInteractive
                className='!p-1 !size-min items-center justify-center flex aspect-square'
                onClick={() => setIsInstantBooking(true)}
              >
                <ArrowRightIcon width={32} height={32} className='rotate-180 fill-primary-text' />
              </CustomInteractive>
              {t('booking.scheduleBooking', {
                defaultValue: 'Schedule Booking',})}
            </div>
          )
        }
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
              <div className='flex flex-1 flex-col gap-4'>
                <CustomInput
                  ref={topicRef}
                  name='topic'
                  label={t('label.topic', { defaultValue: 'Topic' })}
                  type='text'
                  disabled={isRequestPending}
                  placeholder={t('placeholder.topic', {
                    defaultValue: 'Enter the topic of the booking',
                  })}
                  required
                  autoSave='BookingDraft_Topic'
                />
                <CustomInput
                  ref={subjectRef}
                  name='subject'
                  label={t('label.subject', { defaultValue: 'Subject' })}
                  type='suggest'
                  disabled={isRequestPending}
                  options={subjectOptions}
                  placeholder={t('placeholder.subject', {
                    defaultValue: 'Select a subject',
                  })}
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
                  placeholder={t('placeholder.details', {
                    defaultValue: 'Additional details about the booking',
                  })}
                  autoSave='BookingDraft_Details'
                />
                <div className='mt-4 w-full flex gap-2'>
                  <CustomButton
                    loading={isRequestPending}
                    className={isSmallScreen ? '' : 'flex-1'}
                    onClick={() => handleScheduleBooking()}
                  >
                    {isSmallScreen ? (
                      <CalendarIcon width={24} height={24} />
                    ) : (
                      t('button.scheduleBooking', {
                        defaultValue: 'Schedule Booking',
                      })
                    )}
                  </CustomButton>
                  <CustomButton
                    loading={isRequestPending}
                    className='flex-1'
                    filled
                    type='submit'
                  >
                    {t('button.instantBooking', {
                      defaultValue: 'Instant Booking',
                    })}
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className='flex flex-1 flex-col gap-4'>
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
                  label={t('booking.dateTime', {
                    defaultValue: 'Date and Time',
                  })}
                  type='datetime-local'
                  loading={isRequestPending}
                  required
                  autoSave='BookingDraft_DateTime'
                  className='flex-1'
                />
                <CustomButton type='submit' filled>
                  {t('button.book', {
                    defaultValue: 'Book',
                  })}
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
