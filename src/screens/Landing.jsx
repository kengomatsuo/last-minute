import ket from '../assets/ket.png'
import { CustomButton, CustomFooter, FAQComponent } from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { useTranslation } from 'react-i18next'

const Landing = () => {
  const { t } = useTranslation()
  return (
    <div
      className='flex flex-col flex-1 items-center w-screen justify-center'
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      {/* Clear everything between these comments to start fresh */}
      <div className='flex flex-col items-center justify-center'>
        <img src={ket} width={100} alt='Ket' />
        <h1>{t('appName')}</h1>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p>{t('landing.yourCourses')}</p>
        <CustomButton onClick={null}>{t('landing.button')}</CustomButton>
      </div>
      {/* Clear everything between these comments to start fresh */}

      <FAQComponent />
      <CustomFooter />
    </div>
  )
}

export default Landing
