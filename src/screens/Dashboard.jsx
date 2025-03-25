import { useContext } from 'react'
import { CustomButton, CustomCard } from '../components'
import { CourseContext } from '../contexts/CourseContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { courses } = useContext(CourseContext)
  return (
    <div className='w-screen flex flex-col items-center justify-center'>
      <CustomCard
        header='Courses'
        className='w-[min(48rem,11/12*100%)] p-[min(3rem,4%)]'
      >
        <div className='divide-y divide-primary'>
          {courses.map(course => (
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
              <div className='flex flex-col gap-1'>
                <CustomButton className='w-full' onClick={() => null}>
                  Chat
                </CustomButton>{' '}
                <Link to={{pathname: '/session', search: `?course=${course.id}`}} >
                  <CustomButton className='w-full' onClick={() => null} filled>
                    Start Session
                  </CustomButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CustomCard>
    </div>
  )
}

export default Dashboard
