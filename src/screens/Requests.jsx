import React, { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { CustomButton, CustomCard, CustomInteractive } from '../components'
import { firestampToString } from '../utils/conversions'

/**
 * Requests component that displays a list of course requests.
 * 
 * @returns {JSX.Element} The rendered Requests component
 */
const Requests = () => {
  const { requests, acceptRequest } = useContext(CourseContext)
  
  return (
    <div className='w-screen flex flex-col items-center justify-center'>
      <CustomCard
        scrolling
        header='Requests'
        className='w-[min(48rem,11/12*100%)] flex max-h-2/3 p-[min(3rem,4%)]'
      >
          <div className='divide-y flex-1 flex-col divide-primary'>
            {requests.map(course => (
              <div
                key={course.id}
                className='flex w-full gap-2 items-center py-2 px-4'
              >
                <div className='flex-1 text-left'>
                  <p className='font-bold text-xl'>{course.subject}</p>
                  <p className='font-semibold'>{course.topic}</p>
                  <p
                    className={`${
                      !course.details ? 'italic opacity-75' : ''
                    } truncate`}
                  >
                    {course.details || 'No description'}
                  </p>
                  <p>
                    {course.bookingTime
                      ? firestampToString(course.bookingTime)
                      : `Ordered at: ${firestampToString(course.createdAt)}`}
                  </p>
                </div>
                <CustomButton
                  className='ml-auto'
                  onClick={() => acceptRequest(course)}
                >
                  Accept
                </CustomButton>
              </div>
            ))}
        </div>
      </CustomCard>
    </div>
  )
}

export default Requests
