import { useContext, useEffect, useState } from 'react'
import Wallet from '../../assets/icons/ic_wallet.svg?react'
import Plus from '../../assets/icons/ic_plus.svg?react'
import { UserContext } from '../../contexts/UserContext'
import { firestampToDateDiff } from '../../utils/conversions'

const PaymentManagement = () => {
  const [balance, setBalance] = useState(0)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [showTopUpModal, setShowTopUpModal] = useState(false)

  const { updateBalance, getBalance } = useContext(UserContext)
  
  useEffect(() => {
    const fetchBalance = async () => {
        const response = await getBalance()
        setBalance(response?.money)
        setLastUpdated(firestampToDateDiff(response?.last_updated))
    }
    fetchBalance()
  }, [getBalance])

  const handleTopUp = async () => {
    if (topUpAmount && !isNaN(parseFloat(topUpAmount))) {
        await updateBalance(parseFloat(topUpAmount))
        const response = await getBalance()
        setBalance(response?.money)
        setLastUpdated(firestampToDateDiff(response?.last_updated))
        setTopUpAmount('')
        setShowTopUpModal(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto p-8 border-2 rounded-lg border-card-outline">
      <h2 className='text-2xl font-bold text-primary-text mb-8'>Payment Management</h2>
      
      {/* Balance Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-card-outline">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-primary p-3 rounded-full mr-4">
              <Wallet width={24} height={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-700">Current Balance</h2>
              <p className="text-gray-500 text-sm">Available funds</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-800">${balance.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="w-full py-3 px-4 bg-primary text-white rounded-md flex items-center justify-center hover:bg-filled-button-hover transition-colors"
        >
          <Plus width={24} height={24} className="mr-2" />
          Top Up Balance
        </button>
      </div>
      
      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Top Up Balance</h3>
            
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 mb-2">Amount ($)</label>
              <input
                type="number"
                id="amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-3 border rounded-md"
              />
            </div>
            
            <div className="flex justify-between gap-4">
              <button 
                onClick={() => setShowTopUpModal(false)}
                className="flex-1 py-2 px-4 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleTopUp}
                className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-filled-button-hover"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentManagement