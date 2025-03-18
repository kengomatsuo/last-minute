import React from 'react'
import PropTypes from 'prop-types'

/**
 * CustomCard component
 *
 * This component renders a card with a white background, shadow, and rounded corners.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Custom class name for additional styling
 * @param {React.ReactNode} props.header - Header content of the card, typically text or other elements
 * @param {React.ReactNode} props.children - Content of the card, typically text or other elements
 */
const CustomCard = ({ className, header, children }) => {
  return (
    <div
      className={`${className} bg-card-background box-border border-card-outline border-2 backdrop-blur-sm flex flex-col rounded-md`}
    >
      {header && (
        <div className='flex justify-between items-center border-b border-card-outline/50 px-4 pt-2 pb-1 font-semibold text-lg'>
          {header}
        </div>
      )}
      {children}
    </div>
  )
}

CustomCard.propTypes = {
  /**
   * Custom class name for additional styling.
   * This allows for custom styles to be applied to the card.
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * The header of the card.
   * This can be text, an icon, or any other React node.
   * @type {React.ReactNode}
   */
  header: PropTypes.node,
  /**
   * The content of the card.
   * This can be text, an icon, or any other React node.
   * This prop is required.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
}

export default CustomCard
