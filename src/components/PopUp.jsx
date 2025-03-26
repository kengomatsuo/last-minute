import React, { useState } from 'react'

const Popup = ({ onClose, children }) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
          closeWithAnimation()
        }
    }

    const closeWithAnimation = () => {
        setIsVisible(false);
        setTimeout(() => {
          onClose()
        }, 300)
    }

    return (
        <div onClick={handleBackdropClick} className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white rounded-2xl p-8 relative w-[90%] max-w-md shadow-lg">
            <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-4xl font-bold"
            onClick={closeWithAnimation}
            >
            ×
            </button>
            {children}
        </div>
        </div>
    )
}

export default Popup
