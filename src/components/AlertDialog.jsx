import { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { AnimatePresence, motion } from 'framer-motion'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

/**
 * A dialog component that displays alerts with various button options.
 *
 * @param {Object} props - Component props
 * @param {string} [props.title] - The title of the alert
 * @param {string} [props.message] - The message content of the alert
 * @param {Function} [props.onOkay] - Handler called when the Okay/Details button is clicked
 * @param {Function} [props.onCancel] - Handler called when the Cancel button is clicked
 * @param {Function} [props.onClose] - Handler called when the Close button is clicked or dialog is dismissed
 * @param {boolean} [props.okayButton] - Whether to show the Okay button
 * @param {boolean} [props.cancelButton] - Whether to show the Cancel button
 * @param {boolean} [props.closeButton] - Whether to show the Close button
 * @param {boolean} [props.detailsButton] - Whether to show the Details button
 * @param {'okay'|'cancel'|'close'|'details'} [props.primary] - Which button to highlight as primary
 * @returns {JSX.Element} The rendered alert dialog
 */
const AlertDialog = ({
  title,
  message,
  onOkay,
  onCancel,
  onClose,
  okayButton,
  cancelButton,
  closeButton,
  detailsButton,
  primary,
}) => {
  const { t } = useTranslation()
  const { popAlertHead } = useContext(ScreenContext)

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    handleClose()
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    popAlertHead()
  }

  const handleOkay = () => {
    if (onOkay) {
      onOkay()
    }
    handleClose()
  }

	// if no buttons are true, set default to okayButton
	if (!okayButton && !cancelButton && !closeButton && !detailsButton) {
		okayButton = true
	}

  console.log(onOkay, onCancel, onClose, okayButton, cancelButton, closeButton, detailsButton)

  return (
    <AnimatePresence>
      {(message || title) && (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30'>
          <motion.div
            className='absolute top-0 left-0 inset-0 bg-background-secondary/30 z-30'
            // onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOVEMENT_TRANSITION}
          />
          <motion.div
            className='bg-alert-background backdrop-blur-[4px] flex flex-col text-center rounded-lg z-40 min-w-3xs max-w-2xs min-h-32 overflow-clip'
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={MOVEMENT_TRANSITION}
          >
            <div className='flex flex-col flex-1 px-4 py-2 gap-0 items-center justify-center text-primary-text'>
              <h2 className='text-lg font-semibold'>
                {title || t('alert.alert')}
              </h2>
              <p className='text-sm flex items-center justify-center'>
                {message || t('alert.defaultMessage', { defaultValue: 'Oi set the message prop' })}
              </p>
            </div>
            <div className='flex justify-center divide-neutral-200 divide-x border-t border-primary-text/15'>
              {closeButton && (
                <div
                  className={`$${primary === 'close' ? 'font-bold' : ''} px-4 py-2 text-blue-500 flex-1 cursor-pointer active:bg-neutral-400/10 transition-all`}
                  onClick={handleClose}
                >
                  {t('alert.close')}
                </div>
              )}
              {cancelButton && (
                <div
                  className={`$${primary === 'cancel' ? 'font-bold' : ''} px-4 py-2 text-red-500 flex-1 cursor-pointer active:bg-neutral-400/10 transition-all`}
                  onClick={handleCancel}
                >
                  {t('alert.cancel')}
                </div>
              )}
              {detailsButton && (
                <div
                  className={`$${primary === 'details' ? 'font-bold' : ''} px-4 py-2 text-blue-500 flex-1 cursor-pointer active:bg-neutral-400/10 transition-all`}
                  onClick={handleOkay}
                >
                  {t('alert.details')}
                </div>
              )}
              {okayButton && (
                <div
                  className={`$${primary === 'okay' ? 'font-bold' : ''} px-4 py-2 text-blue-500 flex-1 cursor-pointer active:bg-neutral-400/10 transition-all`}
                  onClick={handleOkay}
                >
                  {t('alert.okay')}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

AlertDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onOkay: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  okayButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  detailsButton: PropTypes.bool,
  primary: PropTypes.oneOf(['okay', 'cancel', 'close', 'details']),
}

export default AlertDialog
