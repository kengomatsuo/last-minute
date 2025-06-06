import { use } from 'react'
import { useTranslation } from 'react-i18next'
import { ScreenContext } from '../contexts/ScreenContext'

const MainLoading = () => {
  const { t } = useTranslation()
  const { isOnline } = use(ScreenContext)

  return <div>{isOnline ? t('mainLoading.loading') : t('mainLoading.offline')}</div>
}

export default MainLoading
