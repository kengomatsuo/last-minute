import React from 'react'
import PropTypes from 'prop-types'

const CustomPopup = ({children}) => {

  return (
    <div className='bg-background p-2 rounded-md'>
      {children}
    </div>
  )
}

CustomPopup.propTypes = {
  /**
   * The content of the popup.
   * This can be text, an icon, or any other React node.
   * This prop is required.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
}

export default CustomPopup
