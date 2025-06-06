import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FAQComponent,
  CustomFooter,
  CustomButton,
  CustomInteractive,
} from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { UserContext } from '../contexts/UserContext'
import { ScreenContext } from '../contexts/ScreenContext'

/**
 * Landing page for the Last Minute platform.
 *
 * @returns {JSX.Element} The rendered landing page
 */
const Landing = () => {
  const { openAuthModal } = useContext(UserContext)
  const { setSelectedTheme } = useContext(ScreenContext)
  setSelectedTheme('default')

  return (
    <div className=' w-full' style={{ marginTop: NAVBAR_HEIGHT }}>
      {/* Hero Section */}
      <section
        className='mx-auto flex flex-col md:flex-row items-center py-16 px-4'
        id='home'
      >
        <div className='flex-1 mb-8 md:mb-0'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Need a little help in your studies?
          </h1>
          <p className='text-lg text-gray-700 mb-8'>
            Last Minute is here to connect you with expert tutors for instant
            help. Book a session in just a few clicks and get the support you
            need, when you need it.
          </p>
          <div className='flex gap-4'>
            <CustomButton filled onClick={() => openAuthModal('register')}>
              Get Started
            </CustomButton>
            <CustomButton>Learn More</CustomButton>
          </div>
        </div>
        <div className='flex-1 flex justify-center'>
          <img
            src='https://internationalteacherstraining.com/blog/wp-content/uploads/2018/08/171219-teacher-stock.jpg'
            alt='Hero'
            className='rounded-lg shadow-lg w-full max-w-md object-cover'
          />
        </div>
      </section>

      {/* Trusted Section */}
      <section className='bg-primary py-10'>
        <div className='max-w-5xl mx-auto text-center'>
          <h3 className='text-xl font-semibold text-primary-text mb-6'>
            Trusted by Students from Top Universities
          </h3>
          <div className='flex flex-wrap justify-center items-center gap-8'>
            <img
              src='https://th.bing.com/th/id/R.156aa5488718d890bc8c70916c0b9182?rik=M6sv5EpasSrETQ&riu=http%3a%2f%2fassets.stickpng.com%2fimages%2f62796faf53c8a73e766a78ec.png&ehk=6q6LLlsmsHhi4MxNPPKAqCK4Id0JmX0LibGepLNdTVk%3d&risl=&pid=ImgRaw&r=0'
              alt='Harvard Logo'
              className='h-12 object-contain'
            />
            <img
              src='https://logospng.org/download/mit/logo-mit-icon-1024.png'
              alt='MIT Logo'
              className='h-12 object-contain'
            />
            <img
              src='https://th.bing.com/th/id/R.9befa47161458a8d8e613024c51bba4e?rik=jSUoyYjXMv0gmw&riu=http%3a%2f%2fwww.binus.edu%2fwp-content%2fuploads%2f2016%2f11%2flogoBINUS.png&ehk=rbDN0%2bRCc2agmoDFAZ0EmaQP9zg24uhZMCvNliwyh04%3d&risl=&pid=ImgRaw&r=0'
              alt='Binus University Logo'
              className='h-12 object-contain'
            />
            <img
              src='https://th.bing.com/th/id/R.6cc081bbad665c66ba2e27e28bc04d9c?rik=qh3OhKIt81z2Bg&riu=http%3a%2f%2fde.academic.ru%2fpictures%2fdewiki%2f79%2fOfficial_Yale_Shield.png&ehk=Dm3kOWuFsAE6qunb3E2VUjCLtLwBQTrwyfQEClfF%2bfU%3d&risl=&pid=ImgRaw&r=0'
              alt='Yale Logo'
              className='h-12 object-contain'
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='max-w-7xl mx-auto py-16 px-4' id='about'>
        <h1 className='text-3xl font-bold text-primary-text mb-12'>
          How it works?
        </h1>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://img.icons8.com/ios-glyphs/60/000000/calendar.png'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-primary-text mb-2'>
              Book your class
            </h2>
            <p className='text-primary-text text-center'>
              Choose a subject, topic, and tutor, then book a session at your
              convenience.
            </p>
          </div>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://img.icons8.com/ios-glyphs/60/000000/wallet--v1.png'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-primary-text mb-2'>
              Pay for your class
            </h2>
            <p className='text-primary-text text-center'>
              Securely pay for your class using our trusted payment gateway.
            </p>
          </div>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://img.icons8.com/ios-glyphs/60/000000/video-call.png'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-primary-text mb-2'>
              Join your class
            </h2>
            <p className='text-primary-text text-center'>
              Connect with your tutor via our secure video platform.
            </p>
          </div>
        </div>
      </section>

      {/* Invest Section */}
      <section className='max-w-4xl mx-auto py-16 px-4 text-center flex flex-col items-center'>
        <h2 className='text-lg text-primary font-semibold mb-2'>Last Minute</h2>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Invest in your future today.
        </h1>
        <p className='text-gray-700 mb-8'>
          Our aim is to help you achieve academic success, with mere minutes of
          commitment for your learning convenience.
        </p>
        <CustomButton filled onClick={() => null} className='w-fit'>
          Learn More
        </CustomButton>
      </section>

      {/* Image Placeholder Outside */}
      <div className='max-w-7xl mx-auto mb-8 px-4'>
        <img
          src='https://cdn.bfldr.com/SH6M70M3/as/svq9bmn6kxj2jj4j6z57vx/Woman_sitting_on_bed_with_laptop_and_books_by_Windows_on_Unsplash?width=719&height=464&fit=crop&auto=webp&dpr=4'
          alt='Student on bed with laptop and books'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '20px',
          }}
        />
      </div>

      {/* Images and Features Section */}
      <section className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-16 px-4'>
        <div className='flex-1 flex items-center justify-center mb-8 md:mb-0'>
          <img
            src='https://www.westend61.de/images/0001150575pw/confident-male-student-studying-in-library-CAVF60813.jpg'
            alt='Male student studying in library'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
            }}
          />
        </div>
        <div className='flex-1 flex flex-col gap-8 justify-center'>
          <div>
            <h3 className='text-xl font-semibold text-primary-text mb-2'>
              Instant Bookings
            </h3>
            <p className='text-primary-text mb-2'>
              Book a session with a tutor in just a few clicks, anytime you need
              help.
            </p>
            {/* <CustomInteractive
              className='text-primary underline !w-fit'
              onClick={() => null}
            >
              Learn More
            </CustomInteractive> */}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-primary-text mb-2'>
              No Commitments
            </h3>
            <p className='text-primary-text mb-2'>
              No need to commit to a long-term course. You can book individual
              sessions as needed.
            </p>
            {/* <CustomInteractive
              className='text-primary underline !w-fit'
              onClick={() => null}
            >
              Learn More
            </CustomInteractive> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-primary text-primary-text py-12'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4'>
          <div>
            <h4 className='font-semibold mb-4'>About</h4>
            <ul className='space-y-2'>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  About Us
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  How it Works
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Our Tutors
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Blog
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Location
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Help Center
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  FAQs
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className='hover:underline' onClick={() => null}>
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Last Minute</h4>
            <p className='mb-2'>Contact Number</p>
            <p>Contact Email</p>
          </div>
        </div>
        <div className='text-center text-gray-400 mt-8'>
          &copy; <span>{new Date().getFullYear()}</span> Last Minute by Jason
          Ganteng
        </div>
      </footer>

      {/* Optional FAQ and Custom Footer Components */}
      {/* <FAQComponent /> */}
      {/* <CustomFooter /> */}
    </div>
  )
}

export default Landing
