import { use } from 'react'
import { useTranslation } from 'react-i18next'
import { ScreenContext } from '../contexts/ScreenContext'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import PawAnimation from '../assets/animations/paw.lottie'

/**
 * Displays a loading animation and status message.
 *
 * @returns {JSX.Element} The rendered loading screen
 */
const MainLoading = () => {
  const { t } = useTranslation()
  const { isOnline } = use(ScreenContext)

  return (
    <div className='flex flex-col items-center justify-center text-primary-text'>
      <DotLottieReact
        src={PawAnimation}
        loop
        autoplay
      />
      <p>{isOnline ? t('mainLoading.loading') : t('mainLoading.offline')}</p>
    </div>
  )
}

export default MainLoading
