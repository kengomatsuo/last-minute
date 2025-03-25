import React, { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { CustomButton, CustomCard, CustomInteractive } from '../components'

const Requests = () => {
  const { requests, acceptRequest } = useContext(CourseContext)
  console.log(requests)
  return (
    <div className='w-screen flex flex-col items-center justify-center'>
      <CustomCard
        header='Requests'
        className='w-[min(48rem,11/12*100%)] p-[min(3rem,4%)]'
      >
        <div className='divide-y divide-primary'>
          {requests.map(course => (
            <div className='flex w-full gap-2 items-center py-2 px-4'>
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
              </div>
              <CustomButton className='ml-auto' onClick={() => acceptRequest(course)}>Accept</CustomButton>
            </div>
          ))}
        </div>
      </CustomCard>
    </div>
  )
}

export default Requests
