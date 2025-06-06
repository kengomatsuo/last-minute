import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FAQComponent, CustomFooter } from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'

/**
 * Landing page for the Last Minute platform.
 *
 * @returns {JSX.Element} The rendered landing page
 */
const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    try {
      navigate('/signup')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Navigation error:', error)
    }
  }

  const handleLearnMore = () => {
    try {
      navigate('/about')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Navigation error:', error)
    }
  }

  return (
    <div className='bg-white w-full' style={{ marginTop: NAVBAR_HEIGHT }}>
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
            You can schedule one-on-one sessions with qualified
            <br />
            tutors from top universities to get help whenever you need it.
          </p>
          <div className='flex gap-4'>
            <button
              className='bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition'
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <button
              className='bg-gray-200 text-gray-800 px-6 py-3 rounded font-semibold hover:bg-gray-300 transition'
              onClick={handleLearnMore}
            >
              Learn More
            </button>
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
      <section className='bg-gray-50 py-10'>
        <div className='max-w-5xl mx-auto text-center'>
          <h3 className='text-xl font-semibold text-gray-700 mb-6'>
            Trusted by universities&apos; best lecturers
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
      <section
        className='max-w-7xl mx-auto py-16 px-4'
        id='about'
      >
        <h1 className='text-3xl font-bold text-gray-800 mb-12'>
          How it works?
        </h1>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://placehold.co/60x60?text=Icon'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Book your class
            </h2>
            <p className='text-gray-600 text-center'>
              Choose the date and time that suits your schedule.
            </p>
          </div>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://placehold.co/60x60?text=Icon'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Pay for your class
            </h2>
            <p className='text-gray-600 text-center'>
              Securely pay for your session through our platform.
            </p>
          </div>
          <div className='flex-1 bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <img
              src='https://placehold.co/60x60?text=Icon'
              alt='Step Icon'
              className='mb-4'
            />
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Join your class
            </h2>
            <p className='text-gray-600 text-center'>
              Get direct help from experts and ace your studies.
            </p>
          </div>
        </div>
      </section>

      {/* Invest Section */}
      <section className='max-w-4xl mx-auto py-16 px-4 text-center'>
        <h2 className='text-lg text-blue-600 font-semibold mb-2'>
          Last Minute
        </h2>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Invest in your future today.
        </h1>
        <p className='text-gray-700 mb-8'>
          Our aim is to help you achieve academic success, with mere minutes of
          commitment for your learning convenience.
        </p>
        <button
          className='bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition'
          onClick={handleLearnMore}
        >
          Learn More
        </button>
      </section>

      {/* Image Placeholder Outside */}
      <div className='max-w-7xl mx-auto mb-8 px-4'>
        <div className='bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-500 text-lg font-semibold'>
          Image Placeholder 1
        </div>
      </div>

      {/* Images and Features Section */}
      <section className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-16 px-4'>
        <div className='flex-1 flex items-center justify-center mb-8 md:mb-0'>
          <div className='bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center text-gray-500 text-lg font-semibold'>
            Image Placeholder 2
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-8 justify-center'>
          <div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Instant Bookings
            </h3>
            <p className='text-gray-600 mb-2'>
              You can book classes as much as you want and regardless of
              standing; it&apos;s the last minute.
            </p>
            <button
              className='text-blue-600 hover:underline'
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No Commitments
            </h3>
            <p className='text-gray-600 mb-2'>
              You can drop any timing or class you no longer need at the last
              minute with no penalties.
            </p>
            <button
              className='text-blue-600 hover:underline'
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-gray-200 py-12'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4'>
          <div>
            <h4 className='font-semibold mb-4'>About</h4>
            <ul className='space-y-2'>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/about')}
                >
                  How it Works
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/tutors')}
                >
                  Our Tutors
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/blog')}
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/location')}
                >
                  Location
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/help')}
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/faqs')}
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/terms')}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/privacy')}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className='hover:underline'
                  onClick={() => navigate('/refund')}
                >
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
