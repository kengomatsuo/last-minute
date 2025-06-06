import { useContext, useState, useRef } from 'react'
import WalletIcon from '../../assets/icons/wallet-money.svg?react'
import PlusIcon from '../../assets/icons/ic_plus.svg?react'
import { UserContext } from '../../contexts/UserContext'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

/**
 * Payment management screen for viewing and topping up user balance.
 *
 * @returns {JSX.Element} The rendered payment management component
 */
const PaymentManagement = () => {
  const [topUpAmount, setTopUpAmount] = useState('0')
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const amountRef = useRef(null)

  const { updateBalance, balance } = useContext(UserContext)

  const handleTopUp = async e => {
    if (e) e.preventDefault()
    let isValid = true
    if (amountRef.current) {
      isValid = (await amountRef.current.validate()) && isValid
    }
    if (!isValid) return
    if (topUpAmount && !isNaN(parseFloat(topUpAmount))) {
      await updateBalance(parseFloat(topUpAmount))
      setTopUpAmount('')
      setShowTopUpModal(false)
    }
  }

  return (
    <div className='max-w-3xl mx-auto p-8 border-2 rounded-lg border-card-outline'>
      <h2 className='text-2xl font-bold text-primary-text mb-8'>
        Payment Management
      </h2>
      {/* Balance Card */}
      {/* <div className='bg-card-background p-6 rounded-lg shadow-sm border-2 border-card-outline'> */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <div className='bg-primary p-3 rounded-full mr-4'>
              <WalletIcon width={24} height={24} className="fill-primary-text"/>
            </div>
            <div>
              <h2 className='text-lg font-medium text-primary-text'>
                Current Balance
              </h2>
              <p className='text-primary-text text-sm'>Available funds</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-3xl font-bold text-primary-text'>
              {balance !== undefined ? balance.toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
        <CustomButton
          filled
          onClick={() => setShowTopUpModal(true)}
          className='w-full py-3 px-4 bg-primary text-white rounded-md flex items-center justify-center hover:bg-filled-button-hover transition-colors'
        >
          <PlusIcon width={24} height={24} className='mr-2 fill-primary-text' />
          Top Up Balance
        </CustomButton>
      {/* </div> */}
      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-card-background p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h3 className='text-xl font-semibold mb-4'>Top Up Balance</h3>
            <form onSubmit={handleTopUp}>
              <div className='mb-4'>
                <label
                  htmlFor='amount'
                  className='block text-primary-text mb-2'
                >
                  Amount
                </label>
                <CustomInput
                  type='number'
                  name='amount'
                  value={topUpAmount}
                  onChange={e => setTopUpAmount(e.target.value)}
                  placeholder='Enter amount'
                  inputClassName='w-full p-3 border rounded-md'
                  // ref={amountRef}
                  required
                  min='1'
                  validateFunction={val => {
                    if (!val || isNaN(val) || parseFloat(val) <= 0) {
                      throw new Error('Please enter a valid amount greater than 0')
                    }
                  }}
                />
              </div>
              <div className='flex justify-between gap-4 mt-4'>
                <CustomButton
                  type='button'
                  onClick={() => setShowTopUpModal(false)}
                  className='flex-1 py-2 px-4 border rounded-md hover:bg-gray-50'
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  filled
                  type='submit'
                  className='flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-filled-button-hover'
                >
                  Confirm
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentManagement